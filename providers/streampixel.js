// providers/streampixel.js
// Placeholder implementation for future StreamPixel integration

export async function initStreamPixel(container) {
  console.log("🟣 Initializing StreamPixel provider...");

  let StreamPixelModule;
  try {
    StreamPixelModule = await import("https://unpkg.com/streampixelsdk@latest");
  } catch (err) {
    console.warn("⚠️ StreamPixel SDK not available. Using no-op provider.");
    return {
      type: "streampixel",
      send() {
        console.warn("StreamPixel not initialized yet.");
      },
      onResponse() {},
      onReady(cb) {
        if (cb) cb();
      },
    };
  }

  const { StreamPixelApplication } = StreamPixelModule;

  const { appStream, pixelStreaming, UIControl } =
    await StreamPixelApplication({
      AutoConnect: true,
      appId: "https://share.streampixel.io/692db8484a9ae9b379c6ab79", // updated streampixel id
    });

  if (container && appStream?.rootElement) {
    container.appendChild(appStream.rootElement);
  }

  return {
    type: "streampixel",
    application: appStream,
    ui: UIControl,
    streaming: pixelStreaming,

    send(action, value) {
      UIControl.sendRequest({ action, value });
    },

    onResponse(callback) {
      pixelStreaming.addResponseEventListener("handle_responses", callback);
    },

    onReady(callback) {
      pixelStreaming.addEventListener("videoInitialized", callback);
    },
  };
}
