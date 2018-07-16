import { ofType } from 'redux-observable';
import { actionTypes, actions as channelActions } from '../reducers/channel';
import { withLatestFrom, map } from 'rxjs/operators';

const receiveMessageEpic = (action$, state$) => action$.pipe(
  ofType(actionTypes.RECEIVE_MESSAGE),
  withLatestFrom(state$),
  map(([action, state]) => {
    const forCurrentChannel = action.channelId === state.channel.currentChannelId;
    return forCurrentChannel ?
      channelActions.addMessage(action.channelId, action.message)
      :
      channelActions.setChannelUpdated(action.channelId);
  })
);

export default receiveMessageEpic;
