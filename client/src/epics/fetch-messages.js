import { ofType } from 'redux-observable';
import { actionTypes, actions } from '../reducers/channel';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { ajaxGet } from '../observable/ajax';

const fetchMessagesEpic = (action$, state$) => action$.pipe(
  ofType(actionTypes.FETCH_MESSAGES),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    ajaxGet({
      path: `/channels/${action.channelId}/messages`,
      authToken: state.auth.authToken
    }).pipe(
      mergeMap(response =>
        [
          actions.setMessages(action.channelId, response.messages),
          actions.fetchMessagesFulfilled()
        ]
      )
    )
  )
);

export default fetchMessagesEpic;
