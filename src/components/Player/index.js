import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Alert,
} from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

import Button from 'components/Button';

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
    this.handlePlay();
  }

  componentWillReceiveProps(nextprops) {
    const { trackList } = this.props;
    const { trackList: nextTrackList } = nextprops;

    if (trackList[0].id !== nextTrackList[0].id) {
      this.handlePlay(true);
    }
  }

  handlePlay = async (hasPlay = false) => {
    const { trackList } = this.props;
    const statePlayer = await TrackPlayer.getState();
    let stateTrack = '';

    if (statePlayer === TrackPlayer.STATE_NONE
      || statePlayer === TrackPlayer.STATE_PAUSED
      || statePlayer === TrackPlayer.STATE_STOPPED || hasPlay) {
      const queue = await TrackPlayer.getQueue();
      if (!queue.length) {
        await TrackPlayer.add(trackList);
      }
      TrackPlayer.play();
      stateTrack = 'playing';
    } else {
      TrackPlayer.pause();
      stateTrack = 'pausing';
    }

    Alert.alert(
      'Alert Title',
      `${statePlayer}`,
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

Player.propTypes = {
  trackList: PropTypes.array.isRequired,
};

export default Player;
