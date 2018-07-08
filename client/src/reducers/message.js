import * as R from 'ramda';

const actionTypes = {
  'STORE_MESSAGE': 'MESSAGE_STORE_MESSAGE',
};

export const actions = {
  storeMessage: (message) => ({ type: actionTypes.STORE_MESSAGE, message }),
};

const INIT_STATE = {
  messages: [],
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.STORE_MESSAGE:
      state = R.evolve({ messages: R.append(action.message) })(state);
      break;

    default:
      return state;
  }

  return state;
}
