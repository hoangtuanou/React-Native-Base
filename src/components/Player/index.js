import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

import Button from 'components/Button';
import playlistData from 'constants/playerData';
import assets from 'constants/assets';

import styles from './styles';

// TrackPlayer.STATE_NONE      | 0
// TrackPlayer.STATE_STOPPED   | 1
// TrackPlayer.STATE_PAUSED    | 2
// TrackPlayer.STATE_PLAYING   | 3
// TrackPlayer.STATE_BUFFERING | 6

class ProgressBar extends ProgressComponent {
  render() {
    return (
      <View style={styles.progress}>
        <View style={{ flex: this.getProgress(), backgroundColor: 'red' }} />
        <View style={{ flex: 1 - this.getProgress(), backgroundColor: 'grey' }} />
      </View>
    );
  }
}

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateTrack: 'stop',
    };
  }

  componentDidMount() {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        maxArtworkSize: 400,
        // An array of media controls capabilities
        // Can contain CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_STOP, CAPABILITY_SEEK_TO,
        // CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS, CAPABILITY_SET_RATING
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO,
        ],
        // playIcon: require('./play-icon.png'),
        // pauseIcon: require('./pause-icon.png'),
        // stopIcon: require('./stop-icon.png'),
        // previousIcon: require('./previous-icon.png'),
        // nextIcon: require('./next-icon.png'),
        icon: assets.icon.flower,
        color: 0xfa3843,
      });
    });
  }

  handleAddPlayList = async () => {
    const queue = await TrackPlayer.getQueue();
    if (!queue.length) {
      await TrackPlayer.add(playlistData);
    }
  }

  handlePlay = async () => {
    const statePlayer = await TrackPlayer.getState();
    let stateTrack = '';

    if (statePlayer === TrackPlayer.STATE_NONE
      || statePlayer === TrackPlayer.STATE_PAUSED
      || statePlayer === TrackPlayer.STATE_STOPPED
      || statePlayer === TrackPlayer.STATE_BUFFERING) {
      TrackPlayer.play();
      stateTrack = 'playing';
    } else {
      TrackPlayer.pause();
      stateTrack = 'pausing';
    }

    Alert.alert(
      'Alert Title',
      `${statePlayer}`,
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

    this.setState({ stateTrack });
  }

  handleNext = () => {
    TrackPlayer.skipToNext();
  }

  handleReset = () => {
    TrackPlayer.reset();
  }

  render() {
    const { stateTrack } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="Play music"
          style={styles.getUserBtn}
          handlePress={this.handlePlay}
        />
        <Button
          title="Next"
          style={styles.getUserBtn}
          handlePress={this.handleNext}
        />
        <Button
          title="Add PlayList"
          style={styles.getUserBtn}
          handlePress={this.handleAddPlayList}
        />
        <Button
          title="Reset"
          style={styles.getUserBtn}
          handlePress={this.handleReset}
        />
        <Text>{stateTrack}</Text>
        <ProgressBar />
      </View>
    );
  }
}

export default Player;
