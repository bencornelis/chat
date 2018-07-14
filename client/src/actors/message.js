import { actions as channelActions } from '../reducers/channel';

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
    this.dispatch(channelActions.addMessage(channelId, _msg));
  }
}

export default MessageActor;
