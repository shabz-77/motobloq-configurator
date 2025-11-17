// providers/streaming-provider.js
// Universal provider loader that initializes either Arcware or StreamPixel
// and returns an API with:
//   send(action, value)
//   onResponse(callback)
//   onReady(callback)

export const StreamingProvider = {
  async init(providerName = "arcware", containerId = "stream-container") {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error("❌ Stream container not found:", containerId);
      throw new Error("Stream container missing");
    }

    // Normalize context object that both providers accept
    const context = { container };

    // -------- Arcware --------
    if (providerName === "arcware") {
      const { initArcware } = await import("./arcware.js");
      const provider = await initArcware(context);

      return normalizeProvider(provider);
    }

    // -------- StreamPixel --------
    if (providerName === "streampixel") {
      const { initStreamPixel } = await import("./streampixel.js");
      const provider = await initStreamPixel(context);

      return normalizeProvider(provider);
    }

    throw new Error("Unknown provider: " + providerName);
  },
};

/* -------------------------------------------------------------
   NORMALIZER — Ensures both providers return same API shape
------------------------------------------------------------- */
function normalizeProvider(p) {
  if (!p) throw new Error("Provider returned null/undefined");

  // FINAL API exposed to index.html
  return {
    type: p.type || "unknown",

    // Send command to UE
    send: (action, value) => {
      if (typeof p.send === "function") {
        p.send(action, value);
      } else {
        console.warn("⚠️ Provider has no send()");
      }
    },

    // Handle UE → Web messages
    onResponse: (cb) => {
      if (typeof p.onResponse === "function") {
        p.onResponse(cb);
      } else {
        console.warn("⚠️ Provider has no onResponse()");
      }
    },

    // Stream/video ready
    onReady: (cb) => {
      if (typeof p.onReady === "function") {
        p.onReady(cb);
      } else {
        console.warn("⚠️ Provider has no onReady()");
      }
    },
  };
}
