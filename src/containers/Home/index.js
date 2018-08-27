import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Button from 'components/Button';
import {
  incrementCounter as increAction,
  decrementCounter as decreAction,
} from 'actions/counter';
import { getUser as getUserAction } from 'actions/user';
import { redirectTo } from 'actions/navigation';
import {
  selectCount,
  selectUser,
} from './selectors';
import styles from './styles';

class Home extends Component {
  handleIncreCounter = () => {
    const { incrementCounter } = this.props;
    incrementCounter();
  }

  handleDecreCounter = () => {
    const { decrementCounter } = this.props;
    decrementCounter();
  }

  handleFetchUser = () => {
    const { getUser } = this.props;
    getUser();
  }

  navigateToDetails = () => {
    const { navigation } = this.props;
    navigation.dispatch(redirectTo('details'));
  }

  render() {
    const { count } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{count}</Text>
        <Button
          title="+"
          style={styles.button}
          handlePress={this.handleIncreCounter}
        />
        <Button
          title="-"
          style={styles.button}
          handlePress={this.handleDecreCounter}
        />
        <Button
          title="Get User"
          style={styles.getUserBtn}
          handlePress={this.handleFetchUser}
        />
        <Button
          title="Details"
          style={styles.getUserBtn}
          handlePress={this.navigateToDetails}
        />
      </View>
    );
  }
}

Home.propTypes = {
  count: PropTypes.number,
  navigation: PropTypes.object,
  incrementCounter: PropTypes.func,
  decrementCounter: PropTypes.func,
  getUser: PropTypes.func,
};

Home.defaultProps = {
  count: 0,
  navigation: {},
  incrementCounter: () => {},
  decrementCounter: () => {},
  getUser: () => {},
};

const mapStateToProps = state => ({
  count: selectCount(state),
  users: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(increAction()),
  decrementCounter: () => dispatch(decreAction()),
  getUser: () => dispatch(getUserAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
