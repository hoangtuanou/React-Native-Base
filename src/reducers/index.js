import { combineReducers } from 'redux';
import CounterReducer from './counterReducer';

const AppReducer = combineReducers({
  CounterReducer,
});

export default AppReducer;
