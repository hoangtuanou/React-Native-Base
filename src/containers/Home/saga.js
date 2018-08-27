import { put, call, takeLatest } from 'redux-saga/effects';
import { get } from 'utils/api';
import {
  fetchUserSuccess,
} from './actions';
import {
  GET_USER,
} from './constants';

function* getUserSaga() {
  try {
    const users = yield call(get, 'users');
    yield put(fetchUserSuccess(users));
  } catch (error) {
    throw error;
  }
}

export default function* watchers() {
  yield takeLatest(GET_USER, getUserSaga);
}
