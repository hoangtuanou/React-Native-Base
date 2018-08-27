/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './config/store';
import AppNavigator from './config/navigator';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
