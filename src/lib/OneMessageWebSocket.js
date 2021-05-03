/**
 * Creates a web socket connection to send one message.
 */
class OneMessageWebSocket {
    /**
     * Sends a message to the web socket connection.
     *
     * Specify an optional callback function to receive a message from the server.
     *
     * After `disconnectTimeout` in ms the connection will be closed.
     *
     * @param {string} message
     * @param {WebSocket} websocket
     * @param {function} callback
     * @param {number} disconnectTimeout
     */
    constructor(message, websocket, callback = () => {}, disconnectTimeout = 500) {
        this.callback = callback;
        this.disconnectTimeout = disconnectTimeout;
        this.message = message;
        this.ready = false;
        this.websocket = websocket;

        this.eventOpen = this.eventOpen.bind(this);

        this.websocket.onopen = this.eventOpen;
        this.websocket.onmessage = callback;
    }

    /**
     * Callback when the state from the web socket connection changes.
     *
     * When the connection is established it will send the message.
     */
    eventOpen() {
        if (1 === this.websocket.readyState && !this.ready) {
            this.ready = true;
        }
        this.websocket.send(this.message);
        setTimeout(() => this.websocket.close(), this.disconnectTimeout);
    }
}

export default OneMessageWebSocket;
