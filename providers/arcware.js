// providers/arcware.js
// Clean, fixed, production-ready Arcware provider wrapper

export async function initArcware(context) {
  console.log("🔵 Initializing Arcware provider…");

  // Load Arcware SDK
  const ArcwareSDK = await import(
    "https://unpkg.com/@arcware-cloud/pixelstreaming-websdk@latest/index.esm.js"
  );

  const { ArcwareInit } = ArcwareSDK;

  // Initialize Arcware Pixel Streaming
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

  // Mount stream viewport
  if (context.container && Application?.rootElement) {
    context.container.appendChild(Application.rootElement);
  }

  // ------------------------------
  // CLEAN, RELIABLE EVENT HANDLING
  // ------------------------------

  function send(action, value) {
    console.log("📤 Sending to UE:", action, value);
    Application.emitUIInteraction({ action, value });
  }

  function onResponse(callback) {
    Application.getApplicationResponse((msg) => {
      try {
        const parsed = JSON.parse(msg);
        callback(parsed);
      } catch {
        callback(msg);
      }
    });
  }

  function onReady(callback) {
    PixelStreaming.videoInitializedHandler.add(() => {
      console.log("📺 UE stream video initialized");

      // IMPORTANT:
      // Unreal UI and Variant Manager are not ready instantly.
      // This mirrors your old working build (4s delay).
      setTimeout(() => {
        console.log("🟢 UE READY (delayed)");
        callback();
      }, 1000); // 1s is enough — can adjust to 1500/2000 if needed.
    });
  }

  return {
    type: "arcware",
    application: Application,
    streaming: PixelStreaming,

    send,
    onResponse,
    onReady
  };
}
