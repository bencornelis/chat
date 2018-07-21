import { actions as authActions } from '../reducers/auth';

const AUTH_TOKEN = 'authToken';

class AuthAgent {
  constructor(store) {
    this.dispatch = store.dispatch;

    const authToken = localStorage.getItem(AUTH_TOKEN);

    if (authToken) {
      store.dispatch(authActions.setToken(authToken));
      store.dispatch(authActions.fetchMe());
    }

    store.subscribe(() => {
      const token = store.getState().auth.authToken;
      localStorage.setItem(AUTH_TOKEN, token ? token : '');
    });
  }

  login = (username, password) => {
    this.dispatch(authActions.login(username, password));
  }

  signup = (username, password) => {
    this.dispatch(authActions.signup(username, password));
  }

  logout = () => {
    this.dispatch(authActions.logout());
  }
}

export default AuthAgent;
