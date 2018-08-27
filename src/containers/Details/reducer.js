import { fromJS } from 'immutable';
import {
  INCREMENT,
} from './constants';

const initialState = fromJS({
  counter: 0,

});

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return state.set('counter', state.get('counter') + 1);
    default:
      return state;
  }
};

export default HomeReducer;
