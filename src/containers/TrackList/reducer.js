import { fromJS } from 'immutable';
import {
  GET_PLAYLIST_SUCCESS,
} from './constants';

const initialState = fromJS({
  playList: [],
});

const TrackListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYLIST_SUCCESS:
      return state.set('playList', fromJS(action.playList));
    default:
      return state;
  }
};

export default TrackListReducer;
