import { takeLatest } from 'redux-saga/effects';
import {
  GET_USER,
} from 'actions/actionTypes';
import getUserSaga from './userSaga';

export default function* watchers() {
  yield takeLatest(GET_USER, getUserSaga);
}
