import { NavigationActions } from 'react-navigation';

import { RootNavigator } from 'config/navigations';
import { REDIRECT } from 'actions/actionTypes';

const firstAction = RootNavigator.router.getActionForPathAndParams('home');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const initialNavState = RootNavigator.router.getStateForAction(tempNavState);

function navigationReducer(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case REDIRECT:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.screen, params: action.params }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

export default navigationReducer;
