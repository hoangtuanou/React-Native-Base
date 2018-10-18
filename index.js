/** @format */

import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import App from './src';
import playerHandler from './src/utils/playerHandler';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerEventHandler(playerHandler);
