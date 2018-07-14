import EventEmitter from 'events';
import { fromEvent } from 'rxjs';

// internal events
const REMOTE_MESSAGE = 'REMOTE_MESSAGE';

// message types
const CHAT_MESSAGE = 1;
const TYPING = 2;
const SUBSCRIBED_TO_CHANNEL = 3;

class WebsocketService {
  constructor(url) {
    this.url = url;

    this._internalEmitter = new EventEmitter();

    this.message$ = fromEvent(this._internalEmitter, REMOTE_MESSAGE);
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

    this._internalEmitter.emit(REMOTE_MESSAGE, message);
  }
}

export const messageTypes = {
  CHAT_MESSAGE,
  TYPING,
  SUBSCRIBED_TO_CHANNEL,
};

export default WebsocketService;
