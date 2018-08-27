import { createSelector } from 'reselect';

const selectNavigation = state => state.get('nav');

const makeSelectNavigation = () => createSelector(
  selectNavigation,
  substate => substate.toJS(),
);

export default makeSelectNavigation;
