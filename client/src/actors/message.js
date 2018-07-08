import { actions as messageActions } from '../reducers/message';

class MessageActor {
  constructor(websocketService, dispatch) {
    this.websocketService = websocketService;
    this.dispatch = dispatch;
  }

  sendMessage = (channelId, _msg) => {
    const msg = {
      content: _msg,
      channelId,
    };

    this.websocketService.send(msg);
    this.dispatch(messageActions.storeMessages(channelId, [ _msg ]));
  }
}

export default MessageActor;
