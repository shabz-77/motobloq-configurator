// providers/arcware.js
// Wraps Arcware SDK in the common provider interface

export async function initArcware(container) {
  console.log("🔵 Initializing Arcware provider...");

  const ArcwareSDK = await import(
    "https://unpkg.com/@arcware-cloud/pixelstreaming-websdk@latest/index.esm.js"
  );
  const { ArcwareInit } = ArcwareSDK;

  const { Application, PixelStreaming } = ArcwareInit(
    { shareId: "share-789c771a-f254-4ef2-964f-471477e45529" },
    {
      initialSettings: {
        AutoConnect: true,
        AutoPlayVideo: true,
        StartVideoMuted: true,
        TouchInput: true,
      },
      settings: {
        fullscreenButton: false,
        settingsButton: false,
        infoButton: false,
        audioButton: false,
        micButton: false,
        connectionStrengthIcon: false,
      },
    }
  );

  // Mount into container
  if (container && Application?.rootElement) {
    container.appendChild(Application.rootElement);
  }

  return {
    type: "arcware",
    application: Application,
    streaming: PixelStreaming,

    // Send data to UE
    send(action, value) {
      Application.emitUIInteraction({ action, value });
    },

    // UE -> Web messages
    onResponse(callback) {
      Application.getApplicationResponse((msg) => {
        try {
          callback(JSON.parse(msg));
        } catch {
          callback(msg);
        }
      });
    },

    // Called when video is ready
    onReady(callback) {
      PixelStreaming.videoInitializedHandler.add(callback);
    },
  };
}
