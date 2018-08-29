import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Button from 'components/Button';
import { redirectTo } from 'config/navigator/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

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
  componentWillMount() {
    RNCalendarEvents
      .authorizeEventStore();
  }

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

  handleAddCalendarEvent = async () => {
    const calendar = await RNCalendarEvents.findCalendars();
    const status = await RNCalendarEvents.authorizationStatus();

    if (status) {
      await RNCalendarEvents.saveEvent('Example Event', {
        calendarId: calendar[0].id,
        startDate: moment(1535655600000).subtract(1, 'hours').toISOString(),
        endDate: moment(1535655600000).toISOString(),
      });
    }
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
        <Button
          title="Set Calendar Event"
          style={styles.getUserBtn}
          handlePress={this.handleAddCalendarEvent}
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
