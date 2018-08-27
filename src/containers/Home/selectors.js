import { createSelector } from 'reselect';

const getCounter = state => state.CounterReducer;

const getUser = state => state.userReducer;

export const selectCount = createSelector(
  getCounter,
  item => item.get('counter'),
);

export const selectUser = createSelector(
  getUser,
  item => item.get('users').toJS(),
);

export default getCounter;
