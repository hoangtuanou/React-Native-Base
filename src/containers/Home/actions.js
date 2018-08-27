import {
  INCREMENT,
  DECREMENT,
  GET_USER,
  GET_USER_SUCCESS,
} from './constants';

export const incrementCounter = () => ({
  type: INCREMENT,
});

export const decrementCounter = () => ({
  type: DECREMENT,
});

export const getUser = () => ({
  type: GET_USER,
});

export const fetchUserSuccess = users => ({
  type: GET_USER_SUCCESS,
  users,
});
