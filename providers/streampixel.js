// providers/streampixel.js
// Streampixel provider using the installed NPM SDK (works with Vite)

import { StreamPixelApplication } from "streampixelsdk";

function computeDynamicResolution() {
  const baseW = 1920;
  const baseH = 1080;

  const vw = window.innerWidth || baseW;
  const vh = window.innerHeight || baseH;

  // Treat 1920x1080 as our "design" and scale to fill the *shorter* side
  const scale = Math.max(vw / baseW, vh / baseH);

  let resX = Math.round(baseW * scale);
  let resY = Math.round(baseH * scale);

  // Clamp so we don't go crazy high
  const maxW = 2560;
  const maxH = 1440;
  const minW = 960;
  const minH = 540;

  resX = Math.min(Math.max(resX, minW), maxW);
  resY = Math.min(Math.max(resY, minH), maxH);

  console.log("📐 Dynamic resolution chosen:", { vw, vh, resX, resY });
  return { resX, resY };
}

export async function initStreamPixel(context) {
  console.log("🟣 Initializing Streampixel provider...");

  // StreamingProvider.init() passes { container }
  const { container } = context;

  // 1) Init Streampixel WebSDK
  const { appStream, pixelStreaming, UIControl } =
    await StreamPixelApplication({
      appId: "692db8484a9ae9b379c6ab79", // ✅ your project ID
      AutoConnect: true,
      touchInput: true,
      mouseInput: true,

      // Let their SDK know we want dynamic behavior
      resolutionMode: "Dynamic Resolution Mode",

      // Converts touch taps into mouse clicks (Arcware-style fake mouse)
      fakeMouseWithTouches: true,
    });

  // 2) Mount the root element into our container
  if (container && appStream?.rootElement) {
    container.appendChild(appStream.rootElement);
  } else {
    console.warn("⚠️ No container or rootElement found for Streampixel");
  }

  // Helper: apply dynamic resolution to UE
  function applyDynamicResolution() {
    if (!appStream?.stream) return;

    const { resX, resY } = computeDynamicResolution();

    try {
      // This is exactly how Streampixel’s own frontend talks to UE:
      //   stream.emitConsoleCommand("r.SetRes 1920x1080w")
      appStream.stream.emitConsoleCommand(`r.SetRes ${resX}x${resY}w`);
      console.log("🎯 Sent r.SetRes to UE via Streampixel");
    } catch (err) {
      console.warn("⚠️ Failed to emit r.SetRes via Streampixel stream:", err);
    }
  }

  // -----------------------------
  // FRONTEND → UNREAL (send)
  // -----------------------------
  function send(action, value) {
    console.log("📤 Streampixel → UE:", action, value);

    try {
      // 1) JSON string payload (matches your existing Blueprint logic)
      appStream.stream.emitUIInteraction(
        JSON.stringify({ action, value })
      );

      // 2) Fallback object payload
      appStream.stream.emitUIInteraction({ action, value });
    } catch (err) {
      console.error(
        "❌ Error sending UI interaction via Streampixel:",
        err
      );
    }
  }

  // -----------------------------
  // UNREAL → FRONTEND (responses)
  // -----------------------------
  function onResponse(callback) {
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

      // First pass: apply dynamic res as soon as the video is live
      applyDynamicResolution();

      // Force a fake resize so Streampixel’s internal listeners
      // (like the ones you saw in main.cfa...js) also re-run.
      setTimeout(() => {
        console.log("🔁 Dispatching synthetic resize for Streampixel");
        window.dispatchEvent(new Event("resize"));
        applyDynamicResolution(); // re-apply after the resize
      }, 200);

      // Also listen to real resizes (orientation changes, etc.)
      window.addEventListener("resize", () => {
        // Tiny debounce by relying on browser’s batch; this is cheap anyway
        applyDynamicResolution();
      });

      // Finally tell your app “we’re ready”
      setTimeout(() => {
        console.log("🟢 Streampixel READY (after small delay)");
        callback();
      }, 300);
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
