import * as R from 'ramda';

export const actionTypes = {
  'ADD_CHANNELS': 'CHANNEL_ADD_CHANNELS',
  'ADD_MESSAGE': 'CHANNEL_ADD_MESSAGE',
  'SET_MESSAGES': 'CHANNEL_SET_MESSAGES',
  'VIEW_CHANNEL': 'CHANNEL_VIEW_CHANNEL',
  'FETCH_CHANNELS': 'CHANNEL_FETCH_CHANNELS',
  'FETCH_MESSAGES': 'CHANNEL_FETCH_MESSAGES',
  'FETCH_CHANNELS_FULFILLED': 'CHANNEL_FETCH_CHANNELS_FULFILLED',
  'FETCH_MESSAGES_FULFILLED': 'CHANNEL_FETCH_MESSAGES_FULFILLED',
  'SET_CURRENT_CHANNEL': 'CHANNEL_SET_CURRENT_CHANNEL',
  'SET_CHANNEL_UPDATED': 'CHANNEL_SET_CHANNEL_UPDATED',
};

export const actions = {
  addChannels: (channels) => {
    return { type: actionTypes.ADD_CHANNELS, channels };
  },
  addMessage: (channelId, message) => {
    return { type: actionTypes.ADD_MESSAGE, channelId, message };
  },
  setMessages: (channelId, messages) => {
    return { type: actionTypes.SET_MESSAGES, channelId, messages };
  },
  fetchChannels: () => {
    return { type: actionTypes.FETCH_CHANNELS };
  },
  fetchMessages: (channelId) => {
    return { type: actionTypes.FETCH_MESSAGES, channelId };
  },
  fetchChannelsFulfilled: () => {
    return { type: actionTypes.FETCH_CHANNELS_FULFILLED };
  },
  fetchMessagesFulfilled: () => {
    return { type: actionTypes.FETCH_MESSAGES_FULFILLED };
  },
  setCurrentChannel: (channelId) => {
    return { type: actionTypes.SET_CURRENT_CHANNEL, channelId };
  },
  viewChannel: (channelId) => {
    return { type: actionTypes.VIEW_CHANNEL, channelId };
  },
  setChannelUpdated: (channelId) => {
    return { type: actionTypes.SET_CHANNEL_UPDATED, channelId };
  },
};

const INIT_STATE = {
  currentChannelId: null,
  channelIdToChannel: {}, // { channelId: { channelName, channelId, updatedSinceVisited } }
  channelIdToMessages: {},
  isFetchingChannels: false,
  isFetchingMessages: false,
};

export default function reducer(_state = INIT_STATE, action) {
  let state = Object.assign({}, _state);

  switch(action.type) {
    case actionTypes.ADD_CHANNELS:
      R.forEach(channel => {
        state = R.evolve({
          channelIdToChannel: R.assoc(channel.id, { ...channel, updatedSinceVisited: false }),
          channelIdToMessages: R.assoc(channel.id, [])
        })(state);
      })(action.channels);
      break;

    case actionTypes.ADD_MESSAGE:
      const oldChannelMessages = R.path(['channelIdToMessages', action.channelId])(state);
      const newChannelMessages = R.append(action.message)(oldChannelMessages);
      state = R.assocPath(['channelIdToMessages', action.channelId], newChannelMessages)(state);
      break;

    case actionTypes.SET_MESSAGES:
      state = R.assocPath(['channelIdToMessages', action.channelId], action.messages)(state);
      break;

    case actionTypes.FETCH_CHANNELS:
      state = R.assoc('isFetchingChannels', true)(state);
      break;

    case actionTypes.FETCH_CHANNELS_FULFILLED:
      state = R.assoc('isFetchingChannels', false)(state);
      break;

    case actionTypes.FETCH_MESSAGES:
      state = R.assoc('isFetchingMessages', true)(state);
      break;

    case actionTypes.FETCH_MESSAGES_FULFILLED:
      state = R.assoc('isFetchingMessages', false)(state);
      break;

    case actionTypes.VIEW_CHANNEL:
      break;

    case actionTypes.SET_CURRENT_CHANNEL:
      state = R.assoc('currentChannelId', action.channelId)(state);
      state = R.assocPath(['channelIdToChannel', action.channelId, 'updatedSinceVisited'], false)(state);
      break;

    case actionTypes.SET_CHANNEL_UPDATED:
      state = R.assocPath(['channelIdToChannel', action.channelId, 'updatedSinceVisited'], true)(state);
      break;

    default:
      return state;
  }

  return state;
}
