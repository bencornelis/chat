import * as R from 'ramda';

export const actionTypes = {
  'LOGIN': 'AUTH_LOGIN',
  'SIGNUP': 'AUTH_SIGNUP',
  'LOGOUT': 'AUTH_LOGOUT',
  'SET_TOKEN': 'AUTH_SET_TOKEN',
  'SET_USER_LOGGED_IN': 'AUTH_SET_USER_LOGGED_IN',
  'SET_USER': 'AUTH_SET_USER',
  'FETCH_ME': 'AUTH_FETCH_ME',
  'FETCH_ME_FULFILLED': 'AUTH_FETCH_ME_FULFILLED',
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
  setUser: (user) => {
    return { type: actionTypes.SET_USER, user };
  },
  fetchMe: () => {
    return { type: actionTypes.FETCH_ME };
  },
  fetchMeFulfilled: () => {
    return { type: actionTypes.FETCH_ME_FULFILLED };
  },
};

const INIT_STATE = {
  userLoggedIn: false,
  user: null,
  authToken: null,
  isFetchingMe: false,
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

    case actionTypes.SET_USER:
      state = R.assoc('user', action.user)(state);
      break;

    case actionTypes.FETCH_ME:
      state = R.assoc('isFetchingMe', true)(state);
      break;

    case actionTypes.FETCH_ME_FULFILLED:
      state = R.assoc('isFetchingMe', false)(state);
      break;

    default:
      return state;
  }

  return state;
}
