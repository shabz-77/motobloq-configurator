// main.js — IFRAME VERSION

console.log("Iframe Mode Enabled");

// ------------------------------------------------------
// GLOBALS
// ------------------------------------------------------
const iframe = document.getElementById("sp-frame");
let configState = {};
let streamReady = false;
let configAppliedOnce = false;

// Load from localStorage
try {
  configState = JSON.parse(localStorage.getItem("userSpec") || "{}");
} catch {
  configState = {};
}

// ------------------------------------------------------
// APPLY URL CONFIG INTO STATE
// ------------------------------------------------------
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};
params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  console.log("🔗 Loaded URL config:", loadedConfig);
  configState = { ...configState, ...loadedConfig };
  localStorage.setItem("userSpec", JSON.stringify(configState));
} else {
  console.log("ℹ️ No URL config in URL");
}

// ------------------------------------------------------
// FRONTEND → UE SENDER (via iframe postMessage)
// ------------------------------------------------------
function sendToUnreal(action, value) {
  console.log("📤 Sending to UE:", action, value);

  if (!iframe || !iframe.contentWindow) {
    console.warn("⚠️ iframe not ready yet, cannot send message");
    return;
  }

  // Streampixel: custom JSON to Unreal. Your BP should read field "message"
  iframe.contentWindow.postMessage(
    {
      message: JSON.stringify({ action, value }),
    },
    "https://share.streampixel.io"
  );
}

// Apply configState to Unreal once stream is ready
function applyConfigIfReady() {
  if (!streamReady) {
    console.log("⏳ Stream not ready yet; will apply config later.");
    return;
  }
  if (configAppliedOnce) {
    console.log("✅ Config already applied once; skipping.");
    return;
  }
  if (!configState || Object.keys(configState).length === 0) {
    console.log("ℹ️ No configState to apply.");
    return;
  }

  console.log("🚀 Applying config to stream:", configState);
  configAppliedOnce = true;

  let delay = 0;
  const delayStep = 300; // ms between variant messages

  Object.entries(configState).forEach(([action, value]) => {
    setTimeout(() => sendToUnreal(action, value), delay);
    delay += delayStep;
  });
}

// ------------------------------------------------------
// UE → JS LISTENER (config updates + stream state)
// ------------------------------------------------------
window.addEventListener("message", (event) => {
  // Only trust Streampixel iframe messages
  if (event.origin !== "https://share.streampixel.io") return;

  const data = event.data;
  if (!data) return;

  // 1) Stream state (ready when loadingComplete)
  if (data.type === "stream-state") {
    console.log("🎛 Stream state:", data.value);

    if (data.value === "loadingComplete") {
      console.log("🟢 Streampixel stream ready (loadingComplete)");
      streamReady = true;

      // Show share button only when stream is actually ready AND user has entered
      const iframeEl = document.getElementById("sp-frame");
      const loading = document.getElementById("loading-screen");
      const shareBtn = document.getElementById("shareBtn");

      // If user already clicked "Enter Experience", loading is hidden and iframe visible.
      // If not clicked yet, we keep hero visible; only when they click we show iframe.

      if (iframeEl && iframeEl.style.display === "block" && shareBtn) {
        shareBtn.style.display = "inline-block";
      }

      // Now apply any URL/localStorage config
      applyConfigIfReady();
    }

    return; // done handling stream-state
  }

  // 2) Custom responses from Unreal (via Send Pixel Streaming Response)
  //    Most likely a JSON string or an object containing a JSON string
  let msg = data;

  // If Unreal sends a plain string (Descriptor)
  if (typeof data === "string") {
    try {
      msg = JSON.parse(data);
    } catch {
      // Not JSON, ignore or log
      console.log("📥 UE → JS (string, not JSON):", data);
      return;
    }
  }

  // If Unreal wraps JSON in `message` field: { message: "{...}" }
  if (typeof msg === "object" && typeof msg.message === "string") {
    try {
      msg = JSON.parse(msg.message);
    } catch {
      console.log("📥 UE → JS (message not JSON):", msg);
      return;
    }
  }

  if (typeof msg === "object" && msg !== null) {
    // Mirror the WebSDK behavior: store VS_ selections
    if (msg.action?.startsWith("VS_") && msg.value && msg.value !== "None") {
      configState[msg.action] = msg.value;
      localStorage.setItem("userSpec", JSON.stringify(configState));
      console.log("💾 Saved from UE:", msg.action, "=", msg.value);
    } else {
      console.log("📥 UE → JS (other payload):", msg);
    }
  }
});

// ------------------------------------------------------
// TOAST
// ------------------------------------------------------
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2500);
}

// ------------------------------------------------------
// SHARE LINK HANDLING
// ------------------------------------------------------
function buildShareUrl() {
  const params = new URLSearchParams(configState);
  const qs = params.toString();
  return `${window.location.origin}${window.location.pathname}${qs ? "?" + qs : ""}`;
}

function copyShareLink() {
  const url = buildShareUrl();

  navigator.clipboard.writeText(url).then(
    () => {
      toast("Copied link!");
    },
    () => {
      alert("Unable to copy link.");
    }
  );

  // Silent email tracking (optional)
  if (window.emailjs) {
    window.emailjs
      .send("service_x60sll8", "template_0gersxn", {
        user_name: "Silent Event",
        user_email: "system@motobloq.com",
        user_message: "User copied share link",
        config_url: url,
      })
      .then(() => console.log("Silent EmailJS event sent"))
      .catch((err) => console.error("EmailJS silent send error:", err));
  } else {
    console.warn("EmailJS not loaded, skipping silent email");
  }
}

function sendShareEmail() {
  const name = document.getElementById("share_name")?.value.trim();
  const email = document.getElementById("share_email")?.value.trim();
  const msg = document.getElementById("share_message")?.value.trim();

  if (!name || !email) {
    alert("Please enter name + email.");
    return;
  }

  const url = buildShareUrl();

  if (!window.emailjs) {
    alert("Email service not loaded.");
    console.error("window.emailjs is not available");
    return;
  }

  window.emailjs
    .send("service_x60sll8", "template_0gersxn", {
      user_name: name,
      user_email: email,
      user_message: msg,
      config_url: url,
    })
    .then(() => {
      toast("Email sent!");
      closeShareModal();
    })
    .catch((err) => {
      console.error("EmailJS send error:", err);
      alert("Email failed. Check console for details.");
    });
}

// ------------------------------------------------------
// UI CONTROLS: START EXPERIENCE + SHARE MODAL
// ------------------------------------------------------
function startExperience() {
  const loading = document.getElementById("loading-screen");
  const iframeEl = document.getElementById("sp-frame");
  const shareBtn = document.getElementById("shareBtn");

  if (loading) loading.style.display = "none";
  if (iframeEl) iframeEl.style.display = "block";

  // Only show Share button if stream is already ready
  if (shareBtn && streamReady) {
    shareBtn.style.display = "inline-block";
  }

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
// EXPOSE FUNCTIONS FOR HTML onclick="..."
// ------------------------------------------------------
window.startExperience = startExperience;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.copyShareLink = copyShareLink;
window.sendShareEmail = sendShareEmail;
