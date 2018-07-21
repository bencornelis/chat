import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import Dispatcher from './dispatcher';
import createStoreWithPreloadedState from './store';

import WebsocketService from './services/websocket';
import MessageAgent from './agents/message';
import AuthAgent from './agents/auth';

let messageAgent;
let authAgent;
export const Agents = () => ({
  messageAgent,
  authAgent,
});

(async () => {
  const store = createStoreWithPreloadedState();

  const websocketService = new WebsocketService(process.env.REACT_APP_WEBSOCKET_URL);

  try {
    await websocketService.open();
  } catch (error) {
    console.error('Could not establish a websocket connection.', error);
  }

  new Dispatcher(websocketService, store.dispatch);
  messageAgent = new MessageAgent(websocketService, store);
  authAgent = new AuthAgent(store);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  registerServiceWorker();
})();
