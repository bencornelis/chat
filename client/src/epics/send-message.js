import { ofType } from 'redux-observable';
import { actionTypes, actions as channelActions } from '../reducers/channel';
import { withLatestFrom, map } from 'rxjs/operators';
import { messageTypes } from '../services/websocket';

const sendMessageEpic = (action$, state$, { sendMessage }) => action$.pipe(
  ofType(actionTypes.SEND_MESSAGE),
  withLatestFrom(state$),
  map(([action, state]) => {
    const { channelId, content } = action;
    const user = state.auth.user;

    const message = {
      type: messageTypes.CHAT_MESSAGE,
      payload: {
        channelId,
        content,
        userId: user.id,
        username: user.username,
      }
    };

    sendMessage(message);

    return channelActions.addMessage(message.payload.channelId, message.payload);
  })
);

export default sendMessageEpic;
