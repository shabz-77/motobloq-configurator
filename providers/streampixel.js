// providers/streampixel.js
// Streampixel provider using the installed NPM SDK (works with Vite)

import { StreamPixelApplication } from "streampixelsdk";

export async function initStreamPixel(context) {
  console.log("🟣 Initializing Streampixel provider...");

  // StreamingProvider.init() passes { container }
  const { container } = context;

  // Initialize Streampixel WebSDK
  const { appStream, pixelStreaming, UIControl } =
  await StreamPixelApplication({
    appId: "692db8484a9ae9b379c6ab79", // ✅ your project ID
    AutoConnect: true,
    touchInput: true,
    mouseInput: true,

    // 🔽 From Streampixel docs
    // Makes the stream adapt to window size like their hosted player
    resolutionMode: "Dynamic Resolution Mode",

    // Converts touch taps into mouse clicks (like Arcware fake mouse)
    fakeMouseWithTouches: true,
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
      // Mimic old Arcware behavior so your existing Blueprint keeps working.
      // 1) JSON string payload
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
