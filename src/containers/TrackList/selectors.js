import { createSelector } from 'reselect';

const selectTrackListPageDomain = state => state.get('trackList');

export const makeSelectortPlayList = () => createSelector(
  selectTrackListPageDomain,
  substate => substate.get('playList').toJS(),
);

export default selectTrackListPageDomain;
