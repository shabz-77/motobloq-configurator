// providers/arcware.js
// Clean Arcware provider wrapper that matches OLD working behavior

export async function initArcware(context) {
  console.log("🔵 Initializing Arcware provider…");

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

  // Mount viewport
  if (context.container && Application?.rootElement) {
    context.container.appendChild(Application.rootElement);
  }

function send(action, value) {
  console.log("📤 Sending to UE:", action, value);

  // 1) old working format (string)
  Application.emitUIInteraction(JSON.stringify({ action, value }));

  // 2) fallback format (object)
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

  // ❗ Match old behavior: wait for video, THEN wait 4s, THEN call callback
  function onReady(callback) {
    PixelStreaming.videoInitializedHandler.add(() => {
      console.log("📺 UE stream video initialized");
      setTimeout(() => {
        console.log("🟢 UE READY (delayed 4s)");
        callback();
      }, 4000); // <-- same as old code
    });
  }

  return {
    type: "arcware",
    application: Application,
    streaming: PixelStreaming,
    send,
    onResponse,
    onReady,
  };
}
