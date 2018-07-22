import { actions as chatActions } from '../reducers/chat';

class MessageAgent {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  sendMessage = (channelId, content) => {
    this.dispatch(
      chatActions.sendMessage(channelId, content)
    );
  }
}

export default MessageAgent;
