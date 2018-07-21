import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducers';
import epic from './epics';
import { actions as channelActions } from './reducers/channel';
import Dispatcher from './dispatcher';

import WebsocketService from './services/websocket';
import MessageAgent from './agents/message';
import AuthAgent, { AUTH_TOKEN } from './agents/auth';

let messageAgent;
let authAgent;
export const Agents = () => ({
  messageAgent,
  authAgent,
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(logger, epicMiddleware)
);
epicMiddleware.run(epic);

(async () => {
  const websocketService = new WebsocketService(process.env.REACT_APP_WEBSOCKET_URL);

  try {
    await websocketService.open();
  } catch (error) {
    console.error('Could not establish a websocket connection.', error);
  }

  new Dispatcher(websocketService, store.dispatch);
  messageAgent = new MessageAgent(websocketService, store);
  authAgent = new AuthAgent(store.dispatch);

  store.subscribe(() => {
    localStorage.setItem(AUTH_TOKEN, store.getState().auth.authToken);
  });

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  registerServiceWorker();
})();
