import * as R from 'ramda';

export const actionTypes = {
  'STORE_MESSAGES': 'MESSAGE_STORE_MESSAGES',
  'FETCH_MESSAGES': 'MESSAGE_FETCH_MESSAGES',
  'FETCH_MESSAGES_FULFILLED': 'MESSAGE_FETCH_MESSAGES_FULFILLED',
  'SET_CHANNEL': 'MESSAGE_SET_CHANNEL',
};

export const actions = {
  storeMessages: (channelId, messages) => {
    return { type: actionTypes.STORE_MESSAGES, channelId, messages };
  },
  fetchMessages: (channelId) => {
    return { type: actionTypes.FETCH_MESSAGES, channelId };
  },
  fetchMessagesFulfilled: () => {
    return { type: actionTypes.FETCH_MESSAGES_FULFILLED };
  },
  setChannel: (channelId) => {
    return { type: actionTypes.SET_CHANNEL, channelId };
  },
};

const INIT_STATE = {
  currentChannelId: null,
  channelIdToMessages: {},
  isFetchingMessages: false,
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.STORE_MESSAGES:
      const currentChannelMessages = R.path(['channelIdToMessages', action.channelId])(state);
      state = R.assocPath(
        ['channelIdToMessages', action.channelId],
        R.concat(currentChannelMessages, action.messages)
      )(state);
      break;

    case actionTypes.FETCH_MESSAGES:
      state = R.assoc('isFetchingMessages', true)(state);
      break;

    case actionTypes.FETCH_MESSAGES_FULFILLED:
      state = R.assoc('isFetchingMessages', false)(state);
      break;

    case actionTypes.SET_CHANNEL:
      state = R.assoc('currentChannelId', action.channelId)(state);
      if (R.isNil(R.path(['channelIdToMessages', action.channelId])(state))) {
        state = R.assocPath(['channelIdToMessages', action.channelId], [])(state);
      }
      break;

    default:
      return state;
  }

  return state;
}
