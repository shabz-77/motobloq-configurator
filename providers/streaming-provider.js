// providers/streaming-provider.js
// Universal wrapper that returns a provider object with:
// send(action, value), onResponse(cb), onReady(cb)

export const StreamingProvider = {
  async init(providerName = "arcware", containerId = "stream-container") {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn("⚠️ Stream container not found:", containerId);
    }

    if (providerName === "arcware") {
      const { initArcware } = await import("./arcware.js");
      return await initArcware(container);
    }

    if (providerName === "streampixel") {
      const { initStreamPixel } = await import("./streampixel.js");
      return await initStreamPixel(container);
    }

    throw new Error("Unknown provider: " + providerName);
  },
};
