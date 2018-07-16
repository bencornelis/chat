import { ofType } from 'redux-observable';
import { actionTypes, actions as authActions } from '../reducers/auth';
import { actions as channelActions } from '../reducers/channel';
import { mergeMap } from 'rxjs/operators';
import { ajaxPost } from '../observable/ajax';

const loginEpic = action$ => action$.pipe(
  ofType(actionTypes.LOGIN),
  mergeMap(action => {
    const { username, password } = action;
    return ajaxPost({
      path: '/auth/login',
      body: { username, password },
    }).pipe(
      mergeMap(response =>
        [
          authActions.setToken(response.token),
          authActions.setUserLoggedIn(true),
          channelActions.fetchChannels(),
        ]
      )
    );
  }),
);

export default loginEpic;
