import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';

import {
  incrementCounter as increAction,
  decrementCounter as decreAction,
  getUser as getUserAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectorCount,
  makeSelectortUsers,
} from './selectors';
import styles from './styles';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Player />
      </View>
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {
};

const mapStateToProps = createStructuredSelector({
  count: makeSelectorCount(),
  users: makeSelectortUsers(),
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(increAction()),
  decrementCounter: () => dispatch(decreAction()),
  getUser: () => dispatch(getUserAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
