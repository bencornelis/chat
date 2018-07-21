import { ofType } from 'redux-observable';
import { actionTypes, actions as authActions } from '../reducers/auth';
import { actions as channelActions } from '../reducers/channel';
import { withLatestFrom, mergeMap } from 'rxjs/operators';
import { ajaxGet } from '../observable/ajax';

const fetchMe = (action$, state$) => action$.pipe(
  ofType(actionTypes.FETCH_ME),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    ajaxGet({
      path: `/auth/user/me`,
      authToken: state.auth.authToken
    }).pipe(
      mergeMap(response =>
        [
          authActions.setUser(response.user),
          authActions.setUserLoggedIn(true),
          authActions.fetchMeFulfilled(),
          channelActions.fetchChannels(),
        ]
      )
    )
  )
);

export default fetchMe;
