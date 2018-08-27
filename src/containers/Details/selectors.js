import { createSelector } from 'reselect';

const selectDetailPageDomain = state => state.get('details');

export const makeSelectorCount = () => createSelector(
  selectDetailPageDomain,
  substate => substate.get('counter'),
);

export default selectDetailPageDomain;
