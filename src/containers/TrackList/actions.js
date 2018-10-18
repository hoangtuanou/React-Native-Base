import {
  GET_PLAYLIST,
  GET_PLAYLIST_SUCCESS,
} from './constants';

export const getPlayList = () => ({
  type: GET_PLAYLIST,
});

export const getPlayListSuccess = playList => ({
  type: GET_PLAYLIST_SUCCESS,
  playList,
});
