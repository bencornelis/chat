import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const fetchChannelsEpic = action$ => action$.pipe(
  ofType(actionTypes.FETCH_CHANNELS),
  mergeMap(action =>
    ajax.getJSON(`${process.env.REACT_APP_API_URL}/channels`).pipe(
      mergeMap(response => {
        return from([
          actions.addChannels(response.channels),
          actions.fetchChannelsFulfilled()
        ]);
      })
    )
  )
);

export default fetchChannelsEpic;
