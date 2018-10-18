/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import AppNavigator from './navigator';

class App extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

const createApp = store => (
  class extends React.Component {
    render() {
      return (
        <App store={store} />
      );
    }
  }
);

export default createApp;
