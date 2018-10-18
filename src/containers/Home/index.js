import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AppState,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TrackPlayer from 'react-native-track-player';

import { redirectTo } from 'navigator/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import assets from 'constants/assets';
import Button from 'components/Button';

import reducer from './reducer';
import saga from './saga';

import styles from './styles';

class Home extends Component {
  async componentWillMount() {
    AppState.addEventListener('change', this.handleStateChange);
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      icon: assets.icon.flower,
      color: 0xfa3843,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleStateChange);
  }

  handleStateChange = (appState) => {
    if (appState === 'active') {
      // Updates the playback information when the app is back from background mode
      console.log('APP_STATE: active');
    }
  }

  handlePress = () => {
    const { navigation } = this.props;
    navigation.dispatch(redirectTo('trackList'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Track List"
          handlePress={this.handlePress}
          style={styles.getUserBtn}
        />
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Home.defaultProps = {

};

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = () => ({

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
