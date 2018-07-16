import { actions as channelActions } from '../reducers/channel';
import { messageTypes } from '../services/websocket';

class MessageAgent {
  constructor(websocketService, dispatch) {
    this.websocketService = websocketService;
    this.dispatch = dispatch;
  }

  sendMessage = (channelId, _msg) => {
    const msg = {
      type: messageTypes.CHAT_MESSAGE,
      payload: {
        channelId,
        content: _msg,
      }
    };

    this.websocketService.send(msg);
    this.dispatch(channelActions.addMessage(channelId, msg.payload));
  }
}

export default MessageAgent;
