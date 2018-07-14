import { combineEpics } from 'redux-observable';
import fetchChannelsEpic from './fetch-channels';
import fetchMessagesEpic from './fetch-messages';
import viewChannelEpic from './view-channel';
import receiveMessageEpic from './receive-message';

export default combineEpics(
  fetchChannelsEpic,
  fetchMessagesEpic,
  viewChannelEpic,
  receiveMessageEpic
);
