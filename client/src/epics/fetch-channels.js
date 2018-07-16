import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap, withLatestFrom, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const fetchChannelsEpic = (action$, state$) => action$.pipe(
  ofType(actionTypes.FETCH_CHANNELS),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    ajax({
      url: `${process.env.REACT_APP_API_URL}/channels`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.auth.authToken}`
      }
    }).pipe(
      tap(r => console.log(r)),
      mergeMap(response =>
        [
          actions.addChannels(response.response.channels),
          actions.fetchChannelsFulfilled()
        ]
      )
    )
  )
);

export default fetchChannelsEpic;
