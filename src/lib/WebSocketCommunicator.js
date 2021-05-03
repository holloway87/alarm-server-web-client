import OneMessageWebSocket from './OneMessageWebSocket';

/**
 * Wrapper to send a message via a web socket connection.
 */
class WebSocketCommunicator {
    /**
     * Specifies the web socket url.
     *
     * @param {string} webSocketUrl
     */
    constructor(webSocketUrl) {
        this.webSocketUrl = webSocketUrl;
    }

    /**
     * Sends a message to the web socket server.
     *
     * @param {string} message
     */
    sendMessage(message) {
        new OneMessageWebSocket(message, new WebSocket(this.webSocketUrl));
    }

    /**
     * Sends a message to the web socket server and receives messages with the specified callback.
     *
     * @param {string} message
     * @param {function} callback
     * @param {number} disconnectTimeout
     */
    sendMessageWithResponse(message, callback, disconnectTimeout) {
        new OneMessageWebSocket(message, new WebSocket(this.webSocketUrl), callback, disconnectTimeout);
    }
}

export default WebSocketCommunicator;
