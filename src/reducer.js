import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

// Initial routing state
const globalInitialState = fromJS({
  location: null,
});

/**
 * Merge route into the global application state
 */
export function globalReducer(state = globalInitialState) {
  return state;
}

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
}
