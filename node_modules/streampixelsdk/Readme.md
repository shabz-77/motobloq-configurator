# 📡 StreamPixel SDK Integration Guide

Welcome to the official StreamPixel SDK guide. This SDK helps you integrate Unreal Engine applications into your frontend via WebRTC and provides control over video rendering, input handling, and backend communication.

---

## 📐 1. Configuration

Use the `StreamPixelApplication()` method to initialize the SDK. It returns two objects:

- **`pixelStreaming`**: Handles core WebRTC communication and event responses.
- **`appStream`**: Provides video rendering, DOM container, input control, and utility methods.

### ✅ Example

```js
const { appStream, pixelStreaming } = StreamPixelApplication({
  AutoPlayVideo: true,
  region: "Asia-pacific",
  StartVideoMuted: true,
  AutoConnect: true,
  useMic: false,
  appId: "6744fb98094f3b905b08a4fa",
  afktimeout: 250,
  touchInput: true,
  mouseInput: true,
  gamepadInput: true,
  resolution: true,
  hoverMouse: true,
  xrInput: false,
  keyBoardInput: true,
  fakeMouseWithTouches: false,
  resX: 1920,
  resY: 1080
});
```

### 🔄 Key Parameters

| Param              | Type     | Description                                      |
|--------------------|----------|--------------------------------------------------|
| `AutoConnect`      | boolean  | Connects automatically on load                  |
| `region`           | string   | Project region (e.g., `"Asia-pacific"`)          |
| `resX` / `resY`    | number   | Desired resolution                               |
| `afktimeout`       | number   | Idle timeout in milliseconds                    |
| `mouseInput`       | boolean  | Enable mouse input                              |
| `keyBoardInput`    | boolean  | Enable keyboard input                           |
| `touchInput`       | boolean  | Enable touch input                              |
| `appId`            | string   | Your project ID                                 |

---

## 🧩 2. Connection Handlers

Register connection lifecycle events to update your UI and monitor the connection status.

```js
appStream.onVideoInitialized = () => {
  console.log("VIDEO INITIALIZED");
};

appStream.onWebRtcSdp = () => {
  console.log("SDP sent");
};

appStream.onWebRtcConnecting = () => {
  console.log("Connecting...");
};

appStream.onWebRtcConnected = () => {
  console.log("Connected!");
};

appStream.onConnectAction = () => {
  console.log("Connect Action Triggered");
};
```

---

## 🧠 3. Interact with Unreal Application (Emit + Listen)

### 📥 Receiving Messages from Unreal

```js
pixelStreaming.addResponseEventListener("handle_responses", (response) => {
  console.log("Response from UE:", response);
});
```

> Unreal developers must use `EmitResponse("handle_responses", payload)` on the backend.

### 📤 Sending Messages to Unreal

```js
appStream.stream.emitUIInteraction({
  message: { value: '480p (854x480)', type: "setResolution" }
});
```

Supports control for resolution, quality presets, camera switching, etc.

---

## 🔇 4. Audio Control

Use this snippet to toggle sound on/off:

```js
const toggleSound = () => {
  const audioElement = appStream.stream._webRtcController.streamController.audioElement;
  audioElement.play();
  audioElement.muted = !audioElement.muted;
};
```

---

## 🧼 5. Disconnect & AFK Timeout

### 🔌 Manually Disconnect

```js
pixelStreaming.disconnect();
appStream.stream.disconnect();
```

### ⏳ AFK Timeout

If no user interaction occurs within the `afktimeout` duration, the session will disconnect (if backend supports it).

> 💡 Tip: Track frontend activity (e.g., `mousemove`, `keydown`) to reset AFK timeout if needed.

---

## 📊 6. Display Stream Stats

```js
appStream.statsPanel.show();
console.log(appStream.statsPanel._statsResult);
```

Displays WebRTC debug metrics like frame rate, bandwidth, and latency.

---

## 🖱️ 7. Hovering Mouse Visibility at Runtime

Enable or disable hovering mouse control (for live stream overlays):

```js
UIControlApp.toggleHoveringMouse(true);  // enable
UIControlApp.toggleHoveringMouse(false); // disable
```

---

# 📘 Voice Chat Integration Guide

Our SDK also enables real-time voice chat, messaging, and participant control within your application.

---

## 📦 1. Installation

Install and import the SDK:

```js
import { StreamPixelVoiceChat } from 'streampixelsdk';
```

---

## 🚀 2. Initialization

Create an instance of the voice chat SDK:

```js
const chatSdk = new StreamPixelVoiceChat(
  roomName,   // string: Name of the chat room
  userName,   // string: User’s display name
  voiceChat,  // boolean: Enable or disable voice chat
  avatar,     // string: URL to user’s avatar image
  micStart    // boolean: Mic on by default when joining the room
);
```

### 🔧 Key Parameters

| Param       | Type      | Description                             |
| ----------- | --------- | --------------------------------------- |
| `roomName`  | `string`  | Chat room identifier                    |
| `userName`  | `string`  | Display name for the user               |
| `voiceChat` | `boolean` | Enable or disable voice functionality   |
| `avatar`    | `string`  | URL to the user’s avatar image          |
| `micStart`  | `boolean` | Start with mic on (true) or off (false) |

---

## 🔗 3. Connection Handlers

Monitor connection lifecycle events to update your UI:

```js
chatSdk.onConnect = () => console.log("Connected to voice chat");
chatSdk.onDisconnect = () => console.log("Disconnected");
chatSdk.onError = (err) => console.error("Connection error:", err);
```

| Event          | Description                          |
| -------------- | ------------------------------------ |
| `onConnect`    | Fired when connection is established |
| `onDisconnect` | Fired when disconnected or left      |
| `onError`      | Fired on connection errors           |

---

## 💬 4. Messaging & Events

### 📥 Receiving Messages

```js
chatSdk.onMessage((msg) => {
  console.log("Incoming message:", msg);
});
```

### 📤 Sending Messages

```js
const sendMessage = (text) => {
  chatSdk.sendMessage(text);
};
```

### 👥 Participant Updates

```js
chatSdk.onParticipantUpdate((participants) => {
  console.log("Participants:", participants);
});
```

---

## 🎙️ 5. Microphone Controls

### 🔄 Toggle Local Mic

```js
chatSdk.toggleMic(); // Mutes/unmutes your mic
```

### 🔇 Mute/Unmute Remote

```js
chatSdk.muteAllRemote();   // Mute everyone else
chatSdk.unmuteAllRemote(); // Unmute everyone else
```

### 🔇 Mute Specific Participant

```js
chatSdk.muteSelected(participantId);
```

### 🔊 Unmute Specific Participant

```js
chatSdk.unmuteSelected(participantId);
```

---

## 🛑 7. Disconnect & Cleanup

### 🔌 Leave Room

```js
await chatSdk.leave();
```

### 🔒 Cleanup Resources

```js
chatSdk.disconnect();
```

---

## 📞 8. Support

Need help? Reach out to our team:
📧 [support@streampixel.io](mailto:support@streampixel.io)


## 🧩 Recommended Usage Pattern in React

```js
const { appStream, pixelStreaming } = StreamPixelApplication(config);

// Mount video element
videoRef.current.append(appStream.rootElement);

// Setup lifecycle handlers
appStream.onWebRtcConnected = () => console.log("Connected");

// Listen for events from Unreal
pixelStreaming.addResponseEventListener("eventName", handleCustomEvent);

// Send interaction to Unreal
appStream.stream.emitUIInteraction({
  message: { type: 'action', value: 'trigger' }
});

// Cleanup
pixelStreaming.disconnect();
```

---

## 🛠️ Need Help?

For integration support, documentation, and updates, contact the StreamPixel team or visit our [official support page](https://streampixel.io).

