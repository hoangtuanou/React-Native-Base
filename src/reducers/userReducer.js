import { fromJS } from 'immutable';
import {
  GET_USER_SUCCESS,
} from 'actions/actionTypes';

const initialState = fromJS({
  users: [],
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return state.set('users', fromJS(action.users));
    default:
      return state;
  }
};

export default userReducer;
