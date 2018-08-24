import { createSelector } from 'reselect';

const getCounter = state => state.CounterReducer;

export const selectCount = createSelector(
  getCounter,
  item => item.get('counter'),
);

export default getCounter;
