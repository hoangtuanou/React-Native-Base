import { put, call } from 'redux-saga/effects';
import {
  fetchUserSuccess,
} from 'actions/user';
import { get } from 'utils/api';

export default function* getUserSaga() {
  try {
    const users = yield call(get, 'users');
    yield put(fetchUserSuccess(users));
  } catch (error) {
    throw error;
  }
}
