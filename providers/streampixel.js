// providers/streampixel.js
// StreamPixel provider using the installed NPM SDK

import { StreamPixelApplication } from "streampixel-web-sdk";

export async function initStreamPixel(container) {
  console.log("🟣 Initializing StreamPixel provider...");

  // ✅ Use your Project ID, NOT the share URL
  const { appStream, pixelStreaming, UIControl } =
    await StreamPixelApplication({
      appId: "692db8484a9ae9b379c6ab79",  // your project ID
      AutoConnect: true,
    });

  // Mount video element
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
