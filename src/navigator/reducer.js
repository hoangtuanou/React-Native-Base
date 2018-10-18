import { fromJS } from 'immutable';
import { NavigationActions } from 'react-navigation';

import { REDIRECT } from './constants';
import RootNavigator from './rootNavigation';

const firstAction = RootNavigator.router.getActionForPathAndParams('Home');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);

export const initialState = fromJS(
  tempNavState,
);

function nav(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case REDIRECT:
      nextState = fromJS(RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.screen }),
        state.toJS(),
      ));
      break;
    default:
      nextState = fromJS(RootNavigator.router.getStateForAction(action, state.toJS()));
      break;
  }
  return nextState || state;
}

export default nav;
