import {
  GET_USER,
  GET_USER_SUCCESS,
} from './actionTypes';

export const getUser = () => ({
  type: GET_USER,
});

export const fetchUserSuccess = users => ({
  type: GET_USER_SUCCESS,
  users,
});

export default {};
