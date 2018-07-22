import { combineEpics } from 'redux-observable';
import fetchChannelsEpic from './fetch-channels';
import fetchMessagesEpic from './fetch-messages';
import viewChannelEpic from './view-channel';
import sendMessageEpic from './send-message';
import receiveMessageEpic from './receive-message';
import loginEpic from './login';
import signupEpic from './signup';
import fetchMeEpic from './fetch-me';
import startChatEpic from './open-chat';

export default combineEpics(
  fetchChannelsEpic,
  fetchMessagesEpic,
  viewChannelEpic,
  sendMessageEpic,
  receiveMessageEpic,
  loginEpic,
  signupEpic,
  fetchMeEpic,
  startChatEpic
);
