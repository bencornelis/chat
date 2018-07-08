import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducers';
import epic from './epics';
import { actions as messageActions } from './reducers/message';

import WebsocketService, { events as wsEvents } from './services/websocket';
import MessageActor from './actors/message';

let messageActor;
export const Actors = () => ({
  messageActor,
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

  const queryParams = new URLSearchParams(document.location.search.substring(1));
  const channelId = queryParams.get('channel_id') || 'default_id';
  store.dispatch(messageActions.setChannel(channelId));
  store.dispatch(messageActions.fetchMessages(channelId));

  websocketService.on(wsEvents.MESSAGE_RECEIVED, message => {
    if (message.channelId === channelId) {
      store.dispatch(messageActions.storeMessages(message.channelId, [ message.content ]));
    }
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
