import { actions as authActions } from '../reducers/auth';

export const AUTH_TOKEN = 'AUTH_TOKEN';

class AuthAgent {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  login = (username, password) => {
    this.dispatch(authActions.login(username, password));
  }

  signup = (username, password) => {
    this.dispatch(authActions.signup(username, password));
  }

  logout = () => {
    this.dispatch(authActions.logout());
    localStorage.setItem(AUTH_TOKEN, null);
  }
}

export default AuthAgent;
