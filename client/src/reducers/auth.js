import * as R from 'ramda';

export const actionTypes = {
  'LOGIN': 'AUTH_LOGIN',
  'SIGNUP': 'AUTH_SIGNUP',
  'LOGOUT': 'AUTH_LOGOUT',
  'SET_TOKEN': 'AUTH_SET_TOKEN',
  'SET_USER_LOGGED_IN': 'AUTH_SET_USER_LOGGED_IN',
};

export const actions = {
  login: (username, password) => {
    return { type: actionTypes.LOGIN, username, password };
  },
  signup: (username, password) => {
    return { type: actionTypes.SIGNUP, username, password };
  },
  logout: () => {
    return { type: actionTypes.LOGOUT };
  },
  setToken: (token) => {
    return { type: actionTypes.SET_TOKEN, token };
  },
  setUserLoggedIn: (userLoggedIn) => {
    return { type: actionTypes.SET_USER_LOGGED_IN, userLoggedIn };
  },
};

const INIT_STATE = {
  userLoggedIn: false,
  authToken: null,
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.LOGIN:
      break;

    case actionTypes.SIGNUP:
      break;

    case actionTypes.LOGOUT:
      state = R.assoc('userLoggedIn', false)(state);
      state = R.assoc('authToken', null)(state);
      break;

    case actionTypes.SET_TOKEN:
      state = R.assoc('authToken', action.token)(state);
      break;

    case actionTypes.SET_USER_LOGGED_IN:
      state = R.assoc('userLoggedIn', action.userLoggedIn)(state);
      break;

    default:
      return state;
  }

  return state;
}
