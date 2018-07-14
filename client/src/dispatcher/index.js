import { actions as channelActions } from '../reducers/channel';
import { messageTypes } from '../services/websocket';
import { filter } from 'rxjs/operators';

class Dispatcher {
  constructor(websocketService, dispatch) {
    websocketService
      .message$.pipe(
        filter(msg => msg.type === messageTypes.CHAT_MESSAGE)
      )
      .subscribe(msg =>
        dispatch(channelActions.receiveMessage(msg.payload.channelId, msg.payload))
      );
  }
}

export default Dispatcher;
