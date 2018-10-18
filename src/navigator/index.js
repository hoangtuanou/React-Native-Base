import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import RootNavigator from './rootNavigation';
import makeSelectNavigation from './selectors';
import reducer from './reducer';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  () => makeSelectNavigation(),
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = createStructuredSelector({
  state: makeSelectNavigation(),
});


const withReducer = injectReducer({ key: 'nav', reducer });
const withConnect = connect(mapStateToProps);

export {
  RootNavigator,
  navigationMiddleware,
};

export default compose(
  withReducer,
  withConnect,
)(AppWithNavigationState);
