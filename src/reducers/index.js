import { combineReducers } from 'redux';

import navigationReducer from './navigationReducer';
import CounterReducer from './counterReducer';
import userReducer from './userReducer';

const AppReducer = combineReducers({
  CounterReducer,
  userReducer,
  nav: navigationReducer,
});

export default AppReducer;
