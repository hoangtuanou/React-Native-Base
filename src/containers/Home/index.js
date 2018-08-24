import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import Button from 'components/Button';
import { incrementCounter as increAction, decrementCounter as decreAction } from 'actions/counter';
import { selectCount } from './selectors';
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
      </View>
    );
  }
}

Home.propTypes = {
  count: PropTypes.number,
  incrementCounter: PropTypes.func,
  decrementCounter: PropTypes.func,
};

Home.defaultProps = {
  count: 0,
  incrementCounter: () => {},
  decrementCounter: () => {},
};

const mapStateToProps = state => ({
  count: selectCount(state),
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(increAction()),
  decrementCounter: () => dispatch(decreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
