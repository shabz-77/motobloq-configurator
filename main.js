// main.js (iframe version with URL config + EmailJS)

import { StreamingProvider } from "./providers/streaming-provider.js";

let provider = null;

// ------------------------------------------------------
// CONFIG STATE: URL params + localStorage
// ------------------------------------------------------
let configState = {};

const stored = localStorage.getItem("userSpec");
if (stored) {
  try {
    configState = JSON.parse(stored) || {};
  } catch {
    configState = {};
  }
}

// If URL has no params, allow a fresh start
if (window.location.search.length <= 1) {
  // Only clear if you want a "clean" session on bare URL:
  // localStorage.removeItem("userSpec");
} else {
  // Merge URL params into configState
  const params = new URLSearchParams(window.location.search);
  const loadedConfig = {};

  params.forEach((value, key) => {
    loadedConfig[key] = value;
  });

  if (Object.keys(loadedConfig).length > 0) {
    console.log("🔗 Loaded URL config:", loadedConfig);
    configState = { ...configState, ...loadedConfig };
    localStorage.setItem("userSpec", JSON.stringify(configState));
  }
}

// ------------------------------------------------------
// UTIL: Toast
// ------------------------------------------------------
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// ------------------------------------------------------
// UE <-> JS helpers
// ------------------------------------------------------
function applyConfigToStream(currentProvider) {
  if (!currentProvider) {
    console.warn("Provider not ready yet; cannot apply config.");
    return;
  }

  if (!configState || Object.keys(configState).length === 0) {
    console.log("No configState to apply on startup.");
    return;
  }

  console.log("🚀 Applying initial config to stream:", configState);

  let delay = 0;
  const delayStep = 250; // ms between sends

  Object.entries(configState).forEach(([action, value]) => {
    setTimeout(() => {
      try {
        currentProvider.send({ action, value });
        console.log("Sent initial:", action, value);
      } catch (err) {
        console.error("Error sending initial config:", err);
      }
    }, delay);

    delay += delayStep;
  });
}

function handleProviderResponse(raw) {
  let msg = raw;

  // String -> try to parse JSON
  if (typeof msg === "string") {
    try {
      msg = JSON.parse(msg);
    } catch {
      console.log("📥 UE → JS (string, not JSON):", msg);
      return;
    }
  }

  // If wrapped in { message: "..." }
  if (msg && typeof msg === "object" && typeof msg.message === "string") {
    try {
      msg = JSON.parse(msg.message);
    } catch {
      console.log("📥 UE → JS (message not JSON):", msg);
      return;
    }
  }

  if (!msg || typeof msg !== "object") return;

  // Mirror WebSDK behavior: VS_ fields define our config
  if (msg.action && msg.action.startsWith("VS_") && msg.value && msg.value !== "None") {
    configState[msg.action] = msg.value;
    localStorage.setItem("userSpec", JSON.stringify(configState));
    console.log("💾 Saved from UE:", msg.action, "=", msg.value);
  } else {
    console.log("📥 UE → JS payload:", msg);
  }
}

// ------------------------------------------------------
// INIT STREAMING PROVIDER (Streampixel iframe)
// ------------------------------------------------------
async function initStreaming() {
  try {
    provider = await StreamingProvider.init("streampixel");
    console.log("✅ StreamingProvider initialized (streampixel iframe).");

    // Unreal → JS
    if (typeof provider.onResponse === "function") {
      provider.onResponse((message) => {
        handleProviderResponse(message);
      });
    }

    // Use stream-state if your provider exposes it
    if (typeof provider.onStreamState === "function") {
      provider.onStreamState((state) => {
        console.log("🎛 Stream state:", state);
        if (state === "loadingComplete") {
          onStreamReady();
        }
      });
    } else {
      // Fallback: apply config after small delay
      console.log("No onStreamState hook; using timeout fallback.");
      setTimeout(() => {
        onStreamReady();
      }, 3000);
    }
  } catch (err) {
    console.error("Error initializing StreamingProvider:", err);
  }
}

function onStreamReady() {
  console.log("🟢 Stream ready (onStreamReady called).");

  const loading = document.getElementById("loading-screen");
  const iframeEl = document.getElementById("sp-frame");
  const shareBtn = document.getElementById("shareBtn");

  if (loading) loading.style.display = "none";
  if (iframeEl) iframeEl.style.display = "block";
  if (shareBtn) shareBtn.style.display = "inline-flex";

  applyConfigToStream(provider);
}

// Kick off streaming when page loads
window.addEventListener("load", () => {
  initStreaming();
});

// ------------------------------------------------------
// UI: Start Experience + Share Modal
// ------------------------------------------------------
function startExperience() {
  const loading = document.getElementById("loading-screen");
  const iframeEl = document.getElementById("sp-frame");
  const shareBtn = document.getElementById("shareBtn");

  if (loading) loading.style.display = "none";
  if (iframeEl) iframeEl.style.display = "block";
  if (shareBtn) shareBtn.style.display = "inline-flex";

  // Optional analytics
  if (window.gtag) {
    window.gtag("event", "start_experience", {
      event_category: "engagement",
    });
  }
}

function openShareModal() {
  const modal = document.getElementById("shareModal");
  if (modal) modal.style.display = "flex";
}

function closeShareModal() {
  const modal = document.getElementById("shareModal");
  if (modal) modal.style.display = "none";
}

// ------------------------------------------------------
// SHARE LINK + EMAILJS
// ------------------------------------------------------
function buildConfigUrl() {
  const params = new URLSearchParams(configState);
  const qs = params.toString();
  return `${window.location.origin}${window.location.pathname}${qs ? "?" + qs : ""}`;
}

function getEmailJs() {
  const ej = window.emailjs;
  if (!ej) {
    console.error("❌ window.emailjs is not available");
    return null;
  }
  return ej;
}

function copyShareLink() {
  const url = buildConfigUrl();
  navigator.clipboard.writeText(url).then(
    () => {
      showToast("Copied link!");
    },
    () => {
      alert("Unable to copy link.");
    }
  );

  // Optional silent tracking email
  const ej = getEmailJs();
  if (!ej) return;

  ej
    .send("service_x60sll8", "template_0gersxn", {
      user_name: "Silent Event",
      user_email: "system@motobloq.com",
      user_message: "User copied share link",
      config_url: url,
    })
    .then(() => {
      console.log("Silent EmailJS event sent.");
    })
    .catch((err) => {
      console.error("EmailJS silent send error:", err);
    });
}

function sendShareEmail() {
  const nameInput = document.getElementById("share_name");
  const emailInput = document.getElementById("share_email");
  const msgInput = document.getElementById("share_message");

  const name = nameInput?.value.trim();
  const email = emailInput?.value.trim();
  const message = msgInput?.value.trim();

  if (!name || !email) {
    alert("Please enter your name and email.");
    return;
  }

  const url = buildConfigUrl();
  const ej = getEmailJs();
  if (!ej) {
    alert("Email service is not available.");
    return;
  }

  ej
    .send("service_x60sll8", "template_0gersxn", {
      user_name: name,
      user_email: email,
      user_message: message,
      config_url: url,
    })
    .then(() => {
      showToast("Email sent!");
      closeShareModal();
    })
    .catch((err) => {
      console.error("EmailJS send error:", err);
      alert("Error sending email. Check console for details.");
    });
}

// ------------------------------------------------------
// Expose UI functions for inline onclick="..."
// ------------------------------------------------------
window.startExperience = startExperience;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.copyShareLink = copyShareLink;
window.sendShareEmail = sendShareEmail;
