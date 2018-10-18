import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

import styles from './styles';

export default class TrackItem extends React.PureComponent {
  render() {
    const {
      track: {
        title,
        artist,
      },
      onPress,
    } = this.props;
    return (
      <TouchableOpacity
        style={styles.rowItem}
        onPress={onPress}
      >
        <Text>{title}</Text>
        <Text>{artist}</Text>
      </TouchableOpacity>
    );
  }
}

TrackItem.propTypes = {
  track: PropTypes.object,
  onPress: PropTypes.func.isRequired,
};

TrackItem.defaultProps = {
  track: {},
};
