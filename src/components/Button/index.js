import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  ViewPropTypes,
} from 'react-native';

export default class Button extends Component {
  render() {
    const { handlePress, title, style } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={handlePress}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  handlePress: PropTypes.func,
  title: PropTypes.string,
  style: ViewPropTypes.style,
};

Button.defaultProps = {
  handlePress: () => {},
  title: '',
  style: {},
};
