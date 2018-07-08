import * as R from 'ramda';

const actionTypes = {
  'STORE_MESSAGES': 'MESSAGE_STORE_MESSAGES',
};

export const actions = {
  storeMessages: (messages) => ({ type: actionTypes.STORE_MESSAGES, messages }),
};

const INIT_STATE = {
  messages: [],
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.STORE_MESSAGES:
      state = R.assoc(
        'messages',
        R.concat(state.messages, action.messages)
      )(state);
      break;

    default:
      return state;
  }

  return state;
}
