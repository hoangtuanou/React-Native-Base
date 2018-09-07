import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Date from '../Date';
import styles from './styles';

export default class Dates extends PureComponent {
  render() {
    const {
      currentDateIndex,
      dates,
      onSelectDay,
      onRenderDay,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          dates.map((date, index) => (
            <View key={date}>
              <Date
                date={date}
                index={index}
                isActive={index === currentDateIndex}
                onPress={onSelectDay}
                onRender={onRenderDay}
              />
            </View>
          ))
        }
      </View>
    );
  }
}

Dates.propTypes = {
  dates: PropTypes.array,
  onSelectDay: PropTypes.func,
  onRenderDay: PropTypes.func,
  currentDateIndex: PropTypes.number,
};

Dates.defaultProps = {
  dates: [],
  onSelectDay: () => {},
  onRenderDay: () => {},
  currentDateIndex: 0,
};
