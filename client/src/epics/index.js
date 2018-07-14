import { combineEpics } from 'redux-observable';
import fetchChannelsEpic from './fetch-channels';
import viewChannelEpic from './view-channel';
import fetchMessagesEpic from './fetch-messages';

export default combineEpics(
  fetchChannelsEpic,
  fetchMessagesEpic,
  viewChannelEpic
);
