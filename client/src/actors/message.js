import { actions as messageActions } from '../reducers/message';

class MessageActor {
  constructor(websocketService, dispatch) {
    this.websocketService = websocketService;
    this.dispatch = dispatch;
  }

  sendMessage = msg => {
    this.websocketService.send(msg);
    this.dispatch(messageActions.storeMessages([ msg ]));
  }
}

export default MessageActor;
