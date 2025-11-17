// providers/streaming-provider.js
// UNIVERSAL STREAMING PROVIDER LAYER
// Supports Arcware (current) + StreamPixel (future)

export const StreamingProvider = {
  container: null,

  /* ------------------------------------------------------------
     INIT PROVIDER
  ------------------------------------------------------------ */
  async init(providerName, containerId = "stream-container") {
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error("Stream container not found");

    if (providerName === "arcware") {
      return await initArcware(this);
    }
    if (providerName === "streampixel") {
      return await initStreamPixel(this);
    }

    throw new Error("Unknown provider: " + providerName);
  },
};

/* ------------------------------------------------------------
   ARCWARE PROVIDER (PUBLIC FUNCTION)
------------------------------------------------------------ */
async function initArcware(context) {
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

  // Mount stream
  if (context.container && Application?.rootElement) {
    context.container.appendChild(Application.rootElement);
  }

  return {
    type: "arcware",
    application: Application,
    streaming: PixelStreaming,

    send: (action, value) => {
      Application.emitUIInteraction({ action, value });
    },

    onResponse: (callback) => {
      Application.getApplicationResponse((msg) => {
        try {
          callback(JSON.parse(msg));
        } catch {
          callback(msg);
        }
      });
    },

    onReady: (callback) => {
      PixelStreaming.videoInitializedHandler.add(callback);
    },
  };
}

/* ------------------------------------------------------------
   STREAMPIXEL PROVIDER (PUBLIC FUNCTION)
------------------------------------------------------------ */
async function initStreamPixel(context) {
  console.log("🟣 Initializing StreamPixel provider...");

  let StreamPixelModule;

  try {
    StreamPixelModule = await import("https://unpkg.com/streampixelsdk@latest");
  } catch (err) {
    console.warn("⚠️ StreamPixel SDK not found. Using placeholder.");
    return {
      type: "streampixel",
      send: () => console.warn("StreamPixel not connected yet."),
      onResponse: () => {},
      onReady: () => {},
    };
  }

  const { StreamPixelApplication } = StreamPixelModule;

  const { appStream, pixelStreaming, UIControl } =
    await StreamPixelApplication({
      AutoConnect: true,
      appId: "YOUR_STREAMPIXEL_APPID_HERE", // TODO: replace later
    });

  // Mount
  if (context.container && appStream?.rootElement) {
    context.container.appendChild(appStream.rootElement);
  }

  return {
    type: "streampixel",
    application: appStream,
    ui: UIControl,
    streaming: pixelStreaming,

    send: (action, value) => {
      UIControl.sendRequest({ action, value });
    },

    onResponse: (callback) => {
      pixelStreaming.addResponseEventListener("handle_responses", callback);
    },

    onReady: (callback) => {
      pixelStreaming.addEventListener("videoInitialized", callback);
    },
  };
}
