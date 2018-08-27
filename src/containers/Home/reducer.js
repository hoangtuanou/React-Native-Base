import { fromJS } from 'immutable';
import {
  INCREMENT,
  DECREMENT,
  GET_USER_SUCCESS,
} from './constants';

const initialState = fromJS({
  counter: 0,
  users: [],
});

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state.set('counter', state.get('counter') + 1);
    case DECREMENT:
      return state.set('counter', state.get('counter') - 1);
    case GET_USER_SUCCESS:
      return state.set('users', fromJS(action.users));
    default:
      return state;
  }
};

export default HomeReducer;
