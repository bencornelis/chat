import { ofType } from 'redux-observable';
import { actionTypes, actions as authActions } from '../reducers/auth';
import { actions as channelActions } from '../reducers/channel';
import { mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const signupEpic = action$ => action$.pipe(
  ofType(actionTypes.SIGNUP),
  mergeMap(action => {
    const { username, password } = action;
    return ajax.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      { username, password },
      { 'Content-Type': 'application/json' }
    ).pipe(
      mergeMap(response =>
        [
          authActions.setToken(response.response.token),
          authActions.setUserLoggedIn(true),
          channelActions.fetchChannels(),
        ]
      )
    );
  }),
);

export default signupEpic;
