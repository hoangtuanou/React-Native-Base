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

import Store from './config/store';
import AppNavigator from './config/navigator';

const App = () => (
  <Provider store={Store.store}>
    <AppNavigator />
  </Provider>
);

export default App;
