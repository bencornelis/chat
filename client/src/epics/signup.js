import { ofType } from 'redux-observable';
import { actionTypes, actions as authActions } from '../reducers/auth';
import { actions as channelActions } from '../reducers/channel';
import { mergeMap } from 'rxjs/operators';
import { ajaxPost } from '../observable/ajax';

const signupEpic = action$ => action$.pipe(
  ofType(actionTypes.SIGNUP),
  mergeMap(action => {
    const { username, password } = action;
    return ajaxPost({
      path: '/auth/signup',
      body: { username, password },
    }).pipe(
      mergeMap(response =>
        [
          authActions.setToken(response.token),
          authActions.setUserLoggedIn(true),
          authActions.setUser(response.user),
          channelActions.fetchChannels(),
        ]
      )
    );
  }),
);

export default signupEpic;
