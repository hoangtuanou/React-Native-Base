import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppReducer from 'reducers';
import { navigationMiddleware } from 'config/navigations';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const enhancers = [
    applyMiddleware(sagaMiddleware),
    applyMiddleware(navigationMiddleware),
  ];

  const store = createStore(
    AppReducer,
    compose(...enhancers),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
