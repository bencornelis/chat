import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap, filter, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs';

const viewChannelEpic = (action$, state$) => action$.pipe(
  ofType(actionTypes.VIEW_CHANNEL),
  withLatestFrom(state$),
  filter(([action, state]) => action.channelId !== state.channel.currentChannelId),
  mergeMap(([action, _]) =>
    from([
      actions.setCurrentChannel(action.channelId),
      actions.fetchMessages(action.channelId)
    ])
  )
);

export default viewChannelEpic;
