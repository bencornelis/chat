import { actions as channelActions } from '../reducers/channel';
import { messageTypes } from '../services/websocket';
import { filter } from 'rxjs/operators';

class Dispatcher {
  constructor(websocketService, dispatch) {
    websocketService
      .chat$
      .subscribe(msg =>
        dispatch(channelActions.receiveMessage(msg.channelId, msg))
      );
  }
}

export default Dispatcher;
