import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';


import styles from './styles';

class Details extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Details</Text>
      </View>
    );
  }
}

export default Details;
