"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmockWebSocket = exports.mockWebSocket = exports.MockWebSocketImpl = void 0;
const spyFunctions = {
    constructorSpy: null,
    openSpy: null,
    errorSpy: null,
    closeSpy: null,
    messageSpy: null,
    messageBinarySpy: null,
    sendSpy: null
};
const triggerFunctions = {
    triggerOnOpen: null,
    triggerOnError: null,
    triggerOnClose: null,
    triggerOnMessage: null,
    triggerOnMessageBinary: null,
    triggerRemoteClose: null
};
class MockWebSocketImpl extends WebSocket {
    constructor(url, protocols) {
        var _a;
        super(url, protocols);
        this._readyState = this.OPEN;
        (_a = spyFunctions.constructorSpy) === null || _a === void 0 ? void 0 : _a.call(spyFunctions, this.url);
        triggerFunctions.triggerOnOpen = this.triggerOnOpen.bind(this);
        triggerFunctions.triggerOnError = this.triggerOnError.bind(this);
        triggerFunctions.triggerOnClose = this.triggerOnClose.bind(this);
        triggerFunctions.triggerOnMessage = this.triggerOnMessage.bind(this);
        triggerFunctions.triggerOnMessageBinary = this.triggerOnMessageBinary.bind(this);
        triggerFunctions.triggerRemoteClose = this.triggerRemoteClose.bind(this);
    }
    get readyState() {
        return this._readyState;
    }
    close(code, reason) {
        super.close(code, reason);
        this._readyState = this.CLOSED;
        this.triggerOnClose({ code, reason });
    }
    send(data) {
        var _a;
        (_a = spyFunctions.sendSpy) === null || _a === void 0 ? void 0 : _a.call(spyFunctions, data);
    }
    triggerOnOpen() {
        var _a, _b;
        const event = new Event('open');
        (_a = this.onopen) === null || _a === void 0 ? void 0 : _a.call(this, event);
        (_b = spyFunctions.openSpy) === null || _b === void 0 ? void 0 : _b.call(spyFunctions, event);
    }
    triggerOnError() {
        var _a, _b;
        const event = new Event('error');
        (_a = this.onerror) === null || _a === void 0 ? void 0 : _a.call(this, event);
        (_b = spyFunctions.errorSpy) === null || _b === void 0 ? void 0 : _b.call(spyFunctions, event);
    }
    triggerOnClose(closeReason) {
        var _a, _b;
        const reason = closeReason !== null && closeReason !== void 0 ? closeReason : { code: 1, reason: 'mock reason' };
        const event = new CloseEvent('close', reason);
        (_a = this.onclose) === null || _a === void 0 ? void 0 : _a.call(this, event);
        (_b = spyFunctions.closeSpy) === null || _b === void 0 ? void 0 : _b.call(spyFunctions, event);
    }
    triggerRemoteClose(code, reason) {
        this.close(code, reason);
    }
    triggerOnMessage(message) {
        var _a, _b;
        const data = JSON.stringify(message);
        const event = new MessageEvent('message', { data });
        (_a = this.onmessage) === null || _a === void 0 ? void 0 : _a.call(this, event);
        (_b = spyFunctions.messageSpy) === null || _b === void 0 ? void 0 : _b.call(spyFunctions, event);
    }
    triggerOnMessageBinary(message) {
        var _a, _b;
        const data = message !== null && message !== void 0 ? message : new Blob([JSON.stringify({ type: 'test' })], {
            type: 'application/json'
        });
        const event = new MessageEvent('messagebinary', { data });
        (_a = this.onmessagebinary) === null || _a === void 0 ? void 0 : _a.call(this, event);
        (_b = spyFunctions.messageBinarySpy) === null || _b === void 0 ? void 0 : _b.call(spyFunctions, event);
    }
}
exports.MockWebSocketImpl = MockWebSocketImpl;
const originalWebSocket = WebSocket;
const mockWebSocket = () => {
    spyFunctions.constructorSpy = jest.fn();
    spyFunctions.openSpy = jest.fn();
    spyFunctions.errorSpy = jest.fn();
    spyFunctions.closeSpy = jest.fn();
    spyFunctions.messageSpy = jest.fn();
    spyFunctions.messageBinarySpy = jest.fn();
    spyFunctions.sendSpy = jest.fn();
    global.WebSocket = MockWebSocketImpl;
    return [spyFunctions, triggerFunctions];
};
exports.mockWebSocket = mockWebSocket;
const unmockWebSocket = () => {
    global.WebSocket = originalWebSocket;
    spyFunctions.constructorSpy = null;
    spyFunctions.openSpy = null;
    spyFunctions.errorSpy = null;
    spyFunctions.closeSpy = null;
    spyFunctions.messageSpy = null;
    spyFunctions.messageBinarySpy = null;
};
exports.unmockWebSocket = unmockWebSocket;
//# sourceMappingURL=mockWebSocket.js.map