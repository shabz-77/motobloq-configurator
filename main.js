import { StreamingProvider } from "./providers/streaming-provider.js";

/* ---------------------------------------------------------
   UI HELPERS: OVERLAYS + TOAST + SHARE MODAL
   --------------------------------------------------------- */
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2000);
}

function showStartScreen() {
  const start = document.getElementById("start-screen");
  if (start) start.style.display = "flex";
}

function hideStartScreen() {
  const start = document.getElementById("start-screen");
  if (start) start.style.display = "none";
}

function showConnectOverlay(message = "Connecting to Motoverse server…") {
  const overlay = document.getElementById("connect-overlay");
  const msg = document.getElementById("connect-message");
  const q = document.getElementById("queue-message");
  if (msg) msg.innerText = message;
  if (q) {
    q.style.display = "none";
    q.innerText = "";
  }
  if (overlay) {
    overlay.style.opacity = "1";
    overlay.style.display = "flex";
  }
}

function hideConnectOverlay() {
  const overlay = document.getElementById("connect-overlay");
  if (!overlay) return;

  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.display = "none";
    overlay.style.opacity = "1";
  }, 600);
}

function setQueueText(text) {
  const q = document.getElementById("queue-message");
  if (!q) return;

  q.innerText = text;
  q.style.display = text ? "block" : "none";
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
   CONFIG STATE (Stores user's variant selections)
   --------------------------------------------------------- */
let configState = JSON.parse(localStorage.getItem("userSpec") || "{}");

// If URL has no parameters, clear old saved config
if (window.location.search.length <= 1) {
  configState = {};
  localStorage.removeItem("userSpec");
}

/* ---------------------------------------------------------
   URL PARAMETERS → APPLY TO CONFIGSTATE
   --------------------------------------------------------- */
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};
params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  configState = { ...loadedConfig };
  localStorage.setItem("userSpec", JSON.stringify(configState));
}

/* ---------------------------------------------------------
   STREAM INIT (DELAYED UNTIL USER CLICKS START)
   --------------------------------------------------------- */
let provider = null;
let providerReady = false;

async function startExperience() {
  // 1) Hide the manual start screen
  hideStartScreen();

  // 2) Show the “connecting” overlay (masks StreamPixel status text)
  showConnectOverlay("Connecting to Motoverse server…");

  // 3) Google Analytics event
  if (window.gtag) {
    window.gtag("event", "start_experience", {
      event_category: "engagement",
    });
  }

  // 4) Init streaming provider (Streampixel WebSDK)
  provider = await StreamingProvider.init("streampixel");

  // 5) UE → JS RESPONSE HANDLER
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

  // 6) Stream Ready (video initialized inside provider)
  provider.onReady(() => {
    providerReady = true;

    // Hide the connecting overlay once Streampixel says video is initialized
    hideConnectOverlay();

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

  // 7) Optional: handle disconnect (show overlay again)
  // Your provider returns appStream under provider.application (see streampixel.js)
  if (provider?.application) {
    // appStream.onDisconnect is mentioned by StreamPixel team
    provider.application.onDisconnect = () => {
      providerReady = false;
      showConnectOverlay("Disconnected. Reconnecting to Motoverse server…");
      setQueueText(""); // clear queue text
    };

    // Optional: queue handler hook (if available in SDK)
    // Not all SDK builds expose the same API. We safely check for it.
    try {
      const qh = provider.application?.queueHandler;
      if (qh) {
        // Some SDKs expose callbacks/events; we support a few common patterns safely.
        if (typeof qh.onPositionChanged === "function") {
          qh.onPositionChanged((pos) => {
            setQueueText(`Queue position: ${pos}`);
          });
        } else if (typeof qh.onQueuePosition === "function") {
          qh.onQueuePosition((pos) => {
            setQueueText(`Queue position: ${pos}`);
          });
        }
      }
    } catch (e) {
      // silent: queue UI is optional
    }
  }
}

/* ---------------------------------------------------------
   Wire Start button
   --------------------------------------------------------- */
function wireStartButton() {
  const btn = document.getElementById("startBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await startExperience();
    } catch (err) {
      console.error("Failed to start experience:", err);
      showConnectOverlay("Unable to connect. Please try again.");
      setQueueText("");
      // Optionally bring back start screen
      showStartScreen();
    }
  });
}

// Show start screen on load, and wire the button.
showStartScreen();
wireStartButton();

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

  if (window.gtag) {
    window.gtag("event", "share_link", {
      event_category: "engagement",
      method: "copy_link",
    });
  }

  fetch("/api/send-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      silent: true,
      configUrl: url,
    }),
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
      configUrl: url,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        alert("Error sending email.");
        return;
      }

      if (window.gtag) {
        window.gtag("event", "send_email", {
          event_category: "engagement",
          event_label: "motobloq_email_sent",
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
