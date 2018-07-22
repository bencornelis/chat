import { combineReducers } from 'redux';

import auth from './auth';
import channel from './channel';
import chat from './chat';

export default combineReducers({
  auth,
  channel,
  chat,
});
