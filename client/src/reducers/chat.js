import * as R from 'ramda';

export const actionTypes = {
  'START': 'CHAT_START',
  'SET_IS_OPEN': 'CHAT_SET_IS_OPEN',
  'SEND_MESSAGE': 'CHANNEL_SEND_MESSAGE',
  'RECEIVE_MESSAGE': 'CHANNEL_RECEIVE_MESSAGE',
};

export const actions = {
  start: () => {
    return { type: actionTypes.START };
  },
  setIsOpen: (isOpen) => {
    return { type: actionTypes.SET_IS_OPEN, isOpen };
  },
  sendMessage: (channelId, content) => {
    return { type: actionTypes.SEND_MESSAGE, channelId, content };
  },
  receiveMessage: (channelId, message) => {
    return { type: actionTypes.RECEIVE_MESSAGE, channelId, message };
  },
};

const INIT_STATE = {
  isOpen: false,
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.SET_IS_OPEN:
      state = R.assoc('isOpen', action.isOpen)(state);
      break;

    default:
      return state;
  }

  return state;
}
