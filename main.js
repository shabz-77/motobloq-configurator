// main.js
import { StreamingProvider } from "./providers/streaming-provider.js";

/**
 * Make closeLoading available for the inline onclick in index.html
 * We attach this BEFORE any async/await so it's ready immediately.
 */
window.closeLoading = () => {
  const loader = document.getElementById("loading-screen");
  if (loader) loader.style.display = "none";
};

// -------------------------
// UI helpers (toast + modal)
// -------------------------
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

// -------------------------
// MAIN APP LOGIC
// -------------------------

// Provider (Streampixel by default)
const provider = await StreamingProvider.init("streampixel");

// CONFIG STATE
let configState = JSON.parse(localStorage.getItem("userSpec") || "{}");

// If there are NO query params, reset saved config to avoid stale state
if (window.location.search.length <= 1) {
  configState = {};
  localStorage.removeItem("userSpec");
}

// UE → WEB (save VS_ values when user clicks options)
provider.onResponse((data) => {
  try {
    if (data.action?.startsWith("VS_") && data.value !== "None") {
      configState[data.action] = data.value;
      localStorage.setItem("userSpec", JSON.stringify(configState));
      console.log("✅ Saved from UE:", data.action, "=", data.value);
    }
  } catch (err) {
    console.warn("Failed to handle response:", err);
  }
});

// Parse URL config immediately
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};
params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  console.log("✅ Found config in URL:", loadedConfig);
  configState = { ...loadedConfig };
  localStorage.setItem("userSpec", JSON.stringify(configState));
} else {
  console.info("ℹ️ No URL config to apply");
}

// When stream is ready, hide loader & apply URL config (if any)
provider.onReady(() => {
  console.log("🟢 Stream Ready!");

  // Hide loading screen (if still visible)
  const loader = document.getElementById("loading-screen");
  if (loader) loader.style.display = "none";

  // Apply URL config to Unreal if present
  if (Object.keys(loadedConfig).length > 0) {
    console.log("✅ Applying URL config to UE...");

    let delay = 0;
    const delayStep = 300; // small spacing between messages

    Object.entries(loadedConfig).forEach(([action, value]) => {
      setTimeout(() => {
        console.log(`📤 Sending from URL: ${action} = ${value}`);
        provider.send(action, value);
      }, delay);
      delay += delayStep;
    });
  }
});

// -------------------------
// SHARE LINK + EMAIL
// -------------------------

// COPY LINK + silent email to Motobloq
window.copyShareLink = () => {
  const urlParams = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

  navigator.clipboard.writeText(url).then(() => showToast("Link copied!"));

  if (typeof emailjs !== "undefined") {
    emailjs.send("service_x60sll8", "template_0gersxn", {
      user_name: "Silent Event",
      user_email: "system@motobloq.com",
      user_message: "User copied share link",
      config_url: url,
    });
  } else {
    console.warn("emailjs not loaded, skipping silent email");
  }
};

// Send config + user info to Motobloq
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

  if (typeof emailjs === "undefined") {
    console.error("emailjs is not loaded");
    alert("Email service not available.");
    return;
  }

  emailjs
    .send("service_x60sll8", "template_0gersxn", {
      user_name: name,
      user_email: email,
      user_message: message,
      config_url: url,
    })
    .then(() => {
      showToast("Email sent!");
      window.closeShareModal();
    })
    .catch(() => alert("Error sending email."));
};