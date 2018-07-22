import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducer from '../reducers';
import epic from '../epics';


export default function createStoreWithPreloadedState(preloadedState, dependencies) {
  const epicMiddleware = createEpicMiddleware({ dependencies });
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(logger, epicMiddleware)
  );
  epicMiddleware.run(epic);
  return store;
}
