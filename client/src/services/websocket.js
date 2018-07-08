import EventEmitter from 'events';

// events
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

class WebsocketService extends EventEmitter {
  constructor(url) {
    super();
    this.url = url;
  }

  open = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(false), 3000);
      const ws = new WebSocket(this.url);

      ws.addEventListener('open', () => resolve(true));
      ws.addEventListener('message', this._handleMessage);

      this.ws = ws;
    });
  }

  send = (msg) => {
    const payload = JSON.stringify(msg);
    this.ws.send(payload);
  }

  _handleMessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);

    this.emit(MESSAGE_RECEIVED, message);
  }
}

export const events = {
  MESSAGE_RECEIVED
};

export default WebsocketService;
