// main.js — IFRAME VERSION

console.log("Iframe Mode Enabled");

// ------------------------------------------------------
// GLOBALS
// ------------------------------------------------------
const iframe = document.getElementById("sp-frame");
let configState = JSON.parse(localStorage.getItem("userSpec") || "{}");

// Reset config only if user manually loads clean URL
if (window.location.search.length <= 1) {
  configState = {};
  localStorage.removeItem("userSpec");
}

// ------------------------------------------------------
// APPLY URL CONFIG INTO STATE
// ------------------------------------------------------
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};

params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  console.log("🔗 Loaded URL config:", loadedConfig);
  // FIXED: spread instead of syntax error
  configState = { ...loadedConfig };
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

  // Match Streampixel Unreal JSON guide: send JSON in "message" field
  // Unreal side: Get JSON String Value with Field Name "message"
  iframe.contentWindow.postMessage(
    {
      message: JSON.stringify({ action, value }),
    },
    "https://share.streampixel.io"
  );
}

// ------------------------------------------------------
// UE → JS LISTENER (config updates + ready state)
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

      // Hide loading screen & show iframe + share button
      const loading = document.getElementById("loading-screen");
      const iframeEl = document.getElementById("sp-frame");
      const shareBtn = document.getElementById("shareBtn");

      if (loading) loading.style.display = "none";
      if (iframeEl) iframeEl.style.display = "block";
      if (shareBtn) shareBtn.style.display = "inline-block";

      // Re-apply any saved config (URL or localStorage)
      let delay = 0;
      const delayStep = 300; // ms between variant messages

      Object.entries(configState).forEach(([action, value]) => {
        setTimeout(() => sendToUnreal(action, value), delay);
        delay += delayStep;
      });
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
// SHARE LINK HANDLING (same behavior as WebSDK version)
// ------------------------------------------------------
function copyShareLink() {
  const params = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  navigator.clipboard.writeText(url);
  toast("Copied link!");

  // Silent email tracking
  if (window.emailjs) {
    window.emailjs.send("service_x60sll8", "template_0gersxn", {
      user_name: "Silent Event",
      user_email: "system@motobloq.com",
      user_message: "User copied share link",
      config_url: url,
    });
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

  const params = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  if (!window.emailjs) {
    alert("Email service not loaded.");
    return;
  }

  window.emailjs
    .send("service_x60sll8", "template_0gersxn", {
      user_name: name,
      user_email: email,
      user_message: msg,
      config_url: url,
    })
    .then(() => toast("Email sent!"))
    .catch(() => alert("Email failed."));
}

// ------------------------------------------------------
// UI CONTROLS: START EXPERIENCE + SHARE MODAL
// (kept same as your iframe version)
// ------------------------------------------------------
function startExperience() {
  const loading = document.getElementById("loading-screen");
  const iframeEl = document.getElementById("sp-frame");
  const shareBtn = document.getElementById("shareBtn");

  if (loading) loading.style.display = "none";
  if (iframeEl) iframeEl.style.display = "block";
  if (shareBtn) shareBtn.style.display = "inline-block";

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
