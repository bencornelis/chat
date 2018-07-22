import EventEmitter from 'events';
import { fromEvent, fromPromise } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// internal events
const REMOTE_MESSAGE_EVT = 'REMOTE_MESSAGE_EVT';
const AUTHENTICATED_EVT  = 'AUTHENTICATED_EVT';

// message types
const AUTH_REQUEST = 1;
const AUTH_RESULT = 2;
const CHAT = 3;
const TYPING = 4;
const SUBSCRIBED_TO_CHANNEL = 5;

class WebsocketService {
  constructor(url) {
    this.url = url;

    this._internalEmitter = new EventEmitter();
    this._message$ = fromEvent(this._internalEmitter, REMOTE_MESSAGE_EVT);
    this._authenticated$ = fromEvent(this._internalEmitter, AUTHENTICATED_EVT);

    const messagesOfType = type => {
      return this._message$.pipe(
        filter(R.propEq('type', type)),
        map(R.prop('payload'))
      );
    }

    this._authReq$ = messagesOfType(AUTH_REQUEST);
    this._authRes$ = messagesOfType(AUTH_RESULT);
    this.chat$     = messagesOfType(CHAT);
  }

  open$ = (token) => {
    return fromPromise(this.open(token));
  }

  open = (token) => {
    this.token = token;

    return new Promise((resolve, reject) => {
      setTimeout(() => reject(false), 3000);
      this._authReq$.subscribe(this._handleAuthReq);
      this._authRes$.subscribe(this._handleAuthRes);

      this._authenticated$.subscribe(() => { resolve(true); });

      const ws = new WebSocket(this.url);

      ws.addEventListener('open', this._handleOpen);
      ws.addEventListener('message', this._handleMessage);

      this.ws = ws;
    });
  }

  send = (msg) => {
    this.ws.send(JSON.stringify(msg));
  }

  _handleAuthReq = () => {
    this.send(JSON.stringify({ token: this.token }));
  }

  _handleAuthRes = (message) => {
    const auth = message.payload.auth;
    if (!auth) {
      console.error('could not authenticate with websocket server');
      return;
    }

    this._internalEmitter.emit(AUTHENTICATED_EVT);
  }

  _handleOpen = () => {
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
