import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { ajaxGet } from '../observable/ajax';

const fetchChannelsEpic = (action$, state$) => action$.pipe(
  ofType(actionTypes.FETCH_CHANNELS),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    ajaxGet({
      path: '/channels',
      authToken: state.auth.authToken,
    }).pipe(
      mergeMap(response =>
        [
          actions.addChannels(response.channels),
          actions.fetchChannelsFulfilled()
        ]
      )
    )
  )
);

export default fetchChannelsEpic;
