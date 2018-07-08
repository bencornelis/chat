import { combineEpics } from 'redux-observable';
import fetchMessagesEpic from './fetch-messages';

export default combineEpics(
  fetchMessagesEpic
);
