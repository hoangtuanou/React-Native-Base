import {
  put,
  // call,
  fork,
} from 'redux-saga/effects';
// import { get } from 'utils/api';
import playlistData from 'constants/playerData';
import {
  getPlayListSuccess,
} from './actions';

function* doGetPlayList() {
  try {
    // const users = yield call(get, './playList');
    yield put(getPlayListSuccess(playlistData));
  } catch (error) {
    throw error;
  }
}

export default function* watchers() {
  yield fork(doGetPlayList);
}
