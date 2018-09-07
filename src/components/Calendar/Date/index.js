import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import colors from 'styles/colors';
import styles from './styles';

moment.updateLocale('en', {
  weekdaysMin: 'U_M_T_W_R_F_S'.split('_'),
});

export default class Date extends PureComponent {
  // Call `onRender` and pass component's with when rendered
  onLayout = (event) => {
    const {
      index,
      onRender,
    } = this.props;
    const { nativeEvent: { layout: { width } } } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const {
      date,
      isActive,
    } = this.props;
    const borderColor = isActive ? colors.blue : 'transparent';
    const activeColor = isActive ? colors.blue : colors.black;

    return (
      <TouchableOpacity
        style={[styles.container, { borderColor }]}
        onLayout={this.onLayout}
        onPress={this.onPress}
      >
        <Text style={[styles.day, { color: borderColor }]}>{date.format('dd').toUpperCase()}</Text>
        <Text style={[styles.date, { color: activeColor }]}>{date.format('DD')}</Text>
      </TouchableOpacity>
    );
  }
}

Date.propTypes = {
  index: PropTypes.number,
  date: PropTypes.any,
  onPress: PropTypes.func,
  onRender: PropTypes.func,
  isActive: PropTypes.bool,
};

Date.defaultProps = {
  index: 0,
  date: moment(),
  onPress: () => {},
  onRender: () => {},
  isActive: false,
};
