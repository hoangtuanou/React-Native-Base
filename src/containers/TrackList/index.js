import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { map, filter, uniqBy } from 'lodash';
import TrackPlayer from 'react-native-track-player';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Player from 'components/Player';

import TrackItem from './components/TrackItem';
import {
  getPlayList as getPlayListAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectortPlayList } from './selectors';

import styles from './styles';

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayer: false,
      trackList: props.playList || [],
    };
  }

  handlePlayTrack = (item) => {
    const { playList } = this.props;
    const { trackList } = this.state;
    const trackPlaying = filter(playList, ({ id }) => id === item.id);
    TrackPlayer.reset();
    this.setState({
      showPlayer: true,
      trackList: uniqBy([...trackPlaying, ...trackList], 'id'),
    });
  }

  renderItem = () => {
    const { playList } = this.props;
    return map(playList, item => (
      <TrackItem
        key={item.id}
        track={item}
        onPress={() => this.handlePlayTrack(item)}
      />
    ));
  }

  render() {
    const { showPlayer } = this.state;
    const { trackList } = this.state;
    console.log(trackList);
    return (
      <View style={styles.container}>
        {this.renderItem()}
        {
          showPlayer ? <Player trackList={trackList} /> : null
        }
      </View>
    );
  }
}

TrackList.propTypes = {
  playList: PropTypes.array,
};

TrackList.defaultProps = {
  playList: [],
};

const mapStateToProps = createStructuredSelector({
  playList: makeSelectortPlayList(),
});

const mapDispatchToProps = dispatch => ({
  getPlayList: () => dispatch(getPlayListAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'trackList', reducer });
const withSaga = injectSaga({ key: 'trackList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TrackList);
