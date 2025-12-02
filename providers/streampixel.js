// providers/streampixel.js
// Streampixel provider using the installed NPM SDK (works with Vite)

import { StreamPixelApplication } from "streampixelsdk";

function computeInitialResolution() {
  // Match Streampixel's idea: scale with devicePixelRatio,
  // keep even numbers, and clamp around 1920x1080.
  const dpr = window.devicePixelRatio || 1;

  let w = Math.floor(window.innerWidth * dpr);
  let h = Math.floor(window.innerHeight * dpr);

  // Make sure they’re even (UE likes even dimensions)
  if (w % 2 === 1) w -= 1;
  if (h % 2 === 1) h -= 1;

  const MAX_W = 1920;
  const MAX_H = 1080;

  const scale = Math.min(MAX_W / w, MAX_H / h, 1);
  w = Math.floor(w * scale);
  h = Math.floor(h * scale);

  if (w % 2 === 1) w -= 1;
  if (h % 2 === 1) h -= 1;

  return { resX: w, resY: h };
}

export async function initStreamPixel(context) {
  console.log("🟣 Initializing Streampixel provider...");

  // StreamingProvider.init() passes { container }
  const { container } = context;

  // Compute a good starting resolution for the current device
  const { resX, resY } = computeInitialResolution();
  console.log("🎯 Initial Streampixel res:", resX, "x", resY);

  // Initialize Streampixel WebSDK
  const { appStream, pixelStreaming, UIControl } =
    await StreamPixelApplication({
      appId: "692db8484a9ae9b379c6ab79", // ✅ your project ID
      AutoConnect: true,

      // Input settings
      touchInput: true,
      mouseInput: true,

      // 🔽 Dynamic resolution like the hosted player
      resolutionMode: "Dynamic Resolution Mode",

      // Converts touch taps into mouse clicks (Arcware-style fake mouse)
      fakeMouseWithTouches: true,

      // Start resolution used in the signalling URL (?resX=&resY=)
      resX,
      resY,
    });

  // Mount video element into #stream-container
  if (container && appStream?.rootElement) {
    container.appendChild(appStream.rootElement);
  } else {
    console.warn("⚠️ No container or rootElement found for Streampixel");
  }

  // -----------------------------
  // FRONTEND → UNREAL (send)
  // -----------------------------
  function send(action, value) {
    console.log("📤 Streampixel → UE:", action, value);

    try {
      // 1) JSON string payload (matches your Blueprint expectation)
      appStream.stream.emitUIInteraction(
        JSON.stringify({ action, value })
      );

      // 2) Fallback object payload
      appStream.stream.emitUIInteraction({ action, value });
    } catch (err) {
      console.error("❌ Error sending UI interaction via Streampixel:", err);
    }
  }

  // -----------------------------
  // UNREAL → FRONTEND (responses)
  // -----------------------------
  function onResponse(callback) {
    // Unreal uses Send Pixel Streaming Response with descriptor as JSON.
    pixelStreaming.addResponseEventListener(
      "handle_responses",
      (payload) => {
        console.log("📥 Raw response from UE (Streampixel):", payload);

        let normalized = payload;

        try {
          if (typeof payload === "string") {
            normalized = JSON.parse(payload);
          }
        } catch (err) {
          console.warn(
            "⚠️ Failed to parse Streampixel payload as JSON:",
            err
          );
        }

        callback(normalized);
      }
    );
  }

  // -----------------------------
  // READY (video initialized)
  // -----------------------------
  function onReady(callback) {
    appStream.onVideoInitialized = () => {
      console.log("📺 Streampixel video initialized");
      // Small delay so the first frame + layout settle
      setTimeout(() => {
        console.log("🟢 Streampixel READY (after small delay)");
        callback();
      }, 500);
    };
  }

  // -----------------------------
  // RETURN PROVIDER API
  // -----------------------------
  return {
    type: "streampixel",
    application: appStream,
    ui: UIControl,
    streaming: pixelStreaming,
    send,
    onResponse,
    onReady,
  };
}
