/** @format */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import configureStore from './src/store';
import createApp from './src';
import playerHandler from './src/utils/playerHandler';
import { name as appName } from './app.json';

const store = configureStore();

AppRegistry.registerComponent(appName, () => createApp(store));
TrackPlayer.registerEventHandler(playerHandler(store));
