import { ofType } from 'redux-observable';
import { actionTypes, actions as channelActions } from '../reducers/channel';
import { withLatestFrom, map, partition } from 'rxjs/operators';
import { merge } from 'rxjs';

const receiveMessageEpic = (action$, state$) => {
  const [
    currentChannel$,
    closedChannel$,
  ] = action$.pipe(
    ofType(actionTypes.RECEIVE_MESSAGE),
    withLatestFrom(state$),
    partition(([action, state]) =>
      action.channelId === state.channel.currentChannelId
    )
  );

  return merge(
    currentChannel$.pipe(
      map(([action, _]) =>
        channelActions.addMessage(action.channelId, action.message)
      )
    ),
    closedChannel$.pipe(
      map(([action, _]) =>
        channelActions.setChannelUpdated(action.channelId)
      )
    )
  );
}

export default receiveMessageEpic;
