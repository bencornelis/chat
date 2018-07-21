import { actions as channelActions } from '../reducers/channel';
import { messageTypes } from '../services/websocket';
import { from, fromEvent } from 'rxjs';
import { withLatestFrom, map } from 'rxjs/operators';
import EventEmitter from 'events';

// internal events
const _MESSAGE = '_MESSAGE';

class MessageAgent {
  constructor(websocketService, store) {
    this._emitter = new EventEmitter();

    const user$     = from(store).pipe(map(state$ => state$.auth.user));
    const _message$ = fromEvent(this._emitter, _MESSAGE);

    const message$ = _message$.pipe(
      withLatestFrom(user$),
      map(([{ channelId, content }, user]) => {
        return {
          type: messageTypes.CHAT_MESSAGE,
          payload: {
            channelId,
            content,
            userId: user.id,
            username: user.username,
          }
        };
      })
    );

    message$.subscribe(message => {
      websocketService.send(message);
      store.dispatch(
        channelActions.addMessage(message.payload.channelId, message.payload)
      );
    })
  }

  sendMessage = (channelId, content) => {
    this._emitter.emit(_MESSAGE, { channelId, content });
  }
}

export default MessageAgent;
