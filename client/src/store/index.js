import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducer from '../reducers';
import epic from '../epics';

const epicMiddleware = createEpicMiddleware();

export default function createStoreWithPreloadedState(preloadedState = {}) {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(logger, epicMiddleware)
  );
  epicMiddleware.run(epic);
  return store;
}
