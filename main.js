// main.js — FULL COPY/PASTE

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
// UE → JS LISTENER
// ------------------------------------------------------
window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data) return;

  // 🔥 Streampixel standard response type
  if (data.type === "sp-response") {
    console.log("📥 UE → JS:", data);

    if (data.action?.startsWith("VS_") && data.value !== "None") {
      configState[data.action] = data.value;
      localStorage.setItem("userSpec", JSON.stringify(configState));
      console.log("💾 Saved:", data.action, "=", data.value);
    }
  }
});

// ------------------------------------------------------
// FRONTEND → UE SENDER
// ------------------------------------------------------
function send(action, value) {
  console.log("📤 Sending to UE:", action, value);

  iframe.contentWindow.postMessage(
    {
      type: "sp-send",      // REQUIRED
      action,
      value,
    },
    "*"
  );
}

// ------------------------------------------------------
// APPLY URL CONFIG
// ------------------------------------------------------
const params = new URLSearchParams(window.location.search);
const loadedConfig = {};

params.forEach((v, k) => (loadedConfig[k] = v));

if (Object.keys(loadedConfig).length > 0) {
  console.log("🔗 Loaded URL config:", loadedConfig);
  configState = { ...loadedConfig };
  localStorage.setItem("userSpec", JSON.stringify(configState));
}

// ------------------------------------------------------
// WAIT FOR IFRAME READY → THEN APPLY CONFIG
// ------------------------------------------------------
window.addEventListener("message", (event) => {
  if (event.data?.type === "sp-ready") {
    console.log("🟢 Streampixel Player Ready");

    let delay = 0;
    const delayStep = 300;

    Object.entries(configState).forEach(([action, value]) => {
      setTimeout(() => send(action, value), delay);
      delay += delayStep;
    });
  }
});

// ------------------------------------------------------
// SHARE LINK HANDLING
// ------------------------------------------------------
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(() => (t.style.display = "none"), 2500);
}

window.copyShareLink = () => {
  const params = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  navigator.clipboard.writeText(url);
  toast("Copied link!");

  // Silent email tracking
  emailjs.send("service_x60sll8", "template_0gersxn", {
    user_name: "Silent Event",
    user_email: "system@motobloq.com",
    user_message: "User copied share link",
    config_url: url,
  });
};

// If you have a share modal and form:
window.sendShareEmail = () => {
  const name = document.getElementById("share_name").value.trim();
  const email = document.getElementById("share_email").value.trim();
  const msg = document.getElementById("share_message").value.trim();

  if (!name || !email) {
    alert("Please enter name + email.");
    return;
  }

  const params = new URLSearchParams(configState);
  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  emailjs
    .send("service_x60sll8", "template_0gersxn", {
      user_name: name,
      user_email: email,
      user_message: msg,
      config_url: url,
    })
    .then(() => toast("Email sent!"))
    .catch(() => alert("Email failed."));
};
