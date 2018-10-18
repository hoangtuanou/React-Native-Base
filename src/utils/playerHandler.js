
import TrackPlayer from 'react-native-track-player';

const playerHandler = async (data) => {
  // Handles the player event
  console.log('HANDLER:', data);

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
    default:
      break;
  }
};

export default playerHandler;
