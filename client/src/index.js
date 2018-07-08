import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';
import { actions as messageActions } from './reducers/message';

import WebsocketService, { events as wsEvents } from './services/websocket';
import MessageActor from './actors/message';

let messageActor;
export const Actors = () => ({
  messageActor,
});

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

(async () => {
  const websocketService = new WebsocketService(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

  try {
    await websocketService.open();
  } catch (error) {
    console.error('Could not establish a websocket connection.', error);
  }

  websocketService.on(wsEvents.MESSAGE_RECEIVED, message => {
    store.dispatch(messageActions.storeMessage(message));
  });

  messageActor = new MessageActor(websocketService, store.dispatch);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  registerServiceWorker();
})();
