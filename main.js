import { StreamingProvider } from "./providers/streaming-provider.js";

/* ---------------------------------------------------------
   CLOSE LOADING SCREEN + TRACK "start_experience" EVENT
   --------------------------------------------------------- */
window.closeLoading = () => {
  const loader = document.getElementById("loading-screen");
  if (loader) loader.style.display = "none";

  // Google Analytics custom event
  if (window.gtag) {
    window.gtag("event", "start_experience", {
      event_category: "engagement"
    });
  }
};

/* ---------------------------------------------------------
   UI FUNCTIONS: TOAST, OPEN/CLOSE SHARE MODAL
   --------------------------------------------------------- */
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2000);
}

window.openShareModal = () => {
  const el = document.getElementById("shareModal");
  if (el) el.style.display = "flex";
};

window.closeShareModal = () => {
  const el = document.getElementById("shareModal");
  if (el) el.style.display = "none";
};

/* ---------------------------------------------------------
   INITIALIZE STREAMING PROVIDER (Streampixel WebSDK)
   --------------------------------------------------------- */
const provider = await StreamingProvider.init("streampixel");

/* ---------------------------------------------------------
   CONFIG STATE (Stores user's variant selections)
   --------------------------------------------------------- */
let configState = JSON.parse(localStorage.getItem("userSpec") || "{}");

// If URL has no parameters, clear old saved config
if (window.location.search.length <= 1) {
  configState = {};
  localStorage.removeItem("userSpec");
}

/* ---------------------------------------------------------
   UE → JS RESPONSE HANDLER
   Saves VS_ actions when user selects variants inside UE.
   --------------------------------------------------------- */
provider.onResponse((data) => {
  try {
    if (data.action?.startsWith("VS_") && data.value !== "None") {
      configState[data.action] = data.value;
      localStorage.setItem("userSpec", JSON.stringify(configState));
      console.log("Saved from UE:", data.action, "=", data.value);
    }
  } catch (err) {
    console.warn("Failed to process UE response:", err);
  }
});

/* ---------------------------------------------------------
   READ URL PARAMETERS → APPLY TO CONFIGSTATE
   --------------------------------------------------------- */
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};
params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  configState = { ...loadedConfig };
  localStorage.setItem("userSpec", JSON.stringify(configState));
}

/* ---------------------------------------------------------
   STREAM READY: APPLY URL CONFIG TO UNREAL
   --------------------------------------------------------- */
provider.onReady(() => {
  const loader = document.getElementById("loading-screen");
  if (loader) loader.style.display = "none";

  // Apply URL config with short delays to avoid overload
  if (Object.keys(loadedConfig).length > 0) {
    let delay = 0;
    const delayStep = 300;

    Object.entries(loadedConfig).forEach(([action, value]) => {
      setTimeout(() => {
        provider.send(action, value);
      }, delay);
      delay += delayStep;
    });
  }
});

/* ---------------------------------------------------------
   SHARE LINK BUTTON
   - Copies URL
   - Fires GA event
   - Sends silent serverless email
   --------------------------------------------------------- */
window.copyShareLink = () => {
  const urlParams = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

  navigator.clipboard.writeText(url).then(() => showToast("Link copied!"));

  // Google Analytics event
  if (window.gtag) {
    window.gtag("event", "share_link", {
      event_category: "engagement",
      method: "copy_link"
    });
  }

  // Serverless silent log email
  fetch("/api/send-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      silent: true,
      configUrl: url
    })
  }).catch((err) => {
    console.error("Silent send error:", err);
  });
};

/* ---------------------------------------------------------
   SEND SHARE EMAIL BUTTON
   - Sends email to Motobloq via serverless function
   - Fires GA event on success
   --------------------------------------------------------- */
window.sendShareEmail = () => {
  const nameEl = document.getElementById("share_name");
  const emailEl = document.getElementById("share_email");
  const messageEl = document.getElementById("share_message");

  const name = nameEl?.value.trim() ?? "";
  const email = emailEl?.value.trim() ?? "";
  const message = messageEl?.value.trim() ?? "";

  if (!name || !email) {
    alert("Please enter your name and email.");
    return;
  }

  const urlParams = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

  fetch("/api/send-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      silent: false,
      name,
      email,
      message,
      configUrl: url
    })
  })
    .then(async (res) => {
      if (!res.ok) {
        alert("Error sending email.");
        return;
      }

      // Google Analytics event for successful email
      if (window.gtag) {
        window.gtag("event", "send_email", {
          event_category: "engagement",
          event_label: "motobloq_email_sent"
        });
      }

      showToast("Email sent!");
      window.closeShareModal();
    })
    .catch((err) => {
      console.error("Send email error:", err);
      alert("Error sending email.");
    });
};
