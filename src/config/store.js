import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';

import { navigationMiddleware } from 'config/navigator';
import createReducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();

const initialState = {};
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav'],
};

const middlewares = [sagaMiddleware, navigationMiddleware];
const enhancers = [applyMiddleware(...middlewares), autoRehydrate()];

const store = createStore(
  reducer,
  fromJS(initialState),
  compose(...enhancers),
);

store.runSaga = sagaMiddleware.run;
store.injectedReducers = {}; // Reducer registry
store.injectedSagas = {}; // Saga registry

// if (module.hot) {
//   module.hot.accept('./reducers', () => {
//     store.replaceReducer(createReducer(store.injectedReducers));
//   });
// }

window.persistor = persistStore(store, persistConfig);

export default { store };
