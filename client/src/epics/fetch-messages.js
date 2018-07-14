import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const fetchMessagesEpic = action$ => action$.pipe(
  ofType(actionTypes.FETCH_MESSAGES),
  mergeMap(action =>
    ajax.getJSON(`${process.env.REACT_APP_API_URL}/channels/${action.channelId}/messages`).pipe(
      mergeMap(response => {
        return from([
          actions.setMessages(action.channelId, response.messages),
          actions.fetchMessagesFulfilled()
        ]);
      })
    )
  )
);

export default fetchMessagesEpic;
