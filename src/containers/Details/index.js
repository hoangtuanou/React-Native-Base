import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import Button from 'components/Button';

import {
  increCountAction,
} from './actions';
import reducer from './reducer';
import { makeSelectorCount } from './selectors';

import styles from './styles';

class Details extends Component {
  handleIncreCounter = () => {
    const { incrementCounter } = this.props;
    incrementCounter();
  }

  render() {
    const { counter } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Details</Text>
        <Text style={styles.welcome}>{counter}</Text>
        <Button
          title="+"
          style={styles.button}
          handlePress={this.handleIncreCounter}
        />
      </View>
    );
  }
}

Details.propTypes = {
  incrementCounter: PropTypes.func,
  counter: PropTypes.number,
};

Details.defaultProps = {
  incrementCounter: () => {},
  counter: 0,
};

const mapStateToProps = createStructuredSelector({
  counter: makeSelectorCount(),
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(increCountAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'details', reducer });

export default compose(
  withReducer,
  withConnect,
)(Details);
