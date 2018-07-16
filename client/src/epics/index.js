import { combineEpics } from 'redux-observable';
import fetchChannelsEpic from './fetch-channels';
import fetchMessagesEpic from './fetch-messages';
import viewChannelEpic from './view-channel';
import receiveMessageEpic from './receive-message';
import loginEpic from './login';
import signupEpic from './signup';

export default combineEpics(
  fetchChannelsEpic,
  fetchMessagesEpic,
  viewChannelEpic,
  receiveMessageEpic,
  loginEpic,
  signupEpic,
);
