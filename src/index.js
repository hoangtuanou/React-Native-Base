/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';
import AppNavigator from './config/navigations';

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <AppNavigator />
      </Provider>
    );
  }
}
