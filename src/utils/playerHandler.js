import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const eventHandler = async (store, data) => {
  // Handles the player event

  switch (data.type) {
    case 'remote-play':
      TrackPlayer.play();
      break;
    case 'remote-pause':
      TrackPlayer.pause();
      break;
    case 'remote-next':
      TrackPlayer.skipToNext();
      break;
    case 'remote-previous':
      TrackPlayer.skipToPrevious();
      break;
    case 'playback-error':
      Alert.alert('An error ocurred', data.error);
      break;
    default:
      break;
  }
};

const playerHandler = store => eventHandler.bind(null, store);

export default playerHandler;
