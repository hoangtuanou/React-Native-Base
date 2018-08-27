import { createSelector } from 'reselect';

const selectHomePageDomain = state => state.get('home');

export const makeSelectorCount = () => createSelector(
  selectHomePageDomain,
  substate => substate.get('counter'),
);

export const makeSelectortUsers = () => createSelector(
  selectHomePageDomain,
  substate => substate.get('users').toJS(),
);

export default selectHomePageDomain;
