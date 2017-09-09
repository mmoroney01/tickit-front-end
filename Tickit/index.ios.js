/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { AppRegistry, Text, View, TouchableOpacity } from 'react-native';
import { styles, mapStyles } from './components/style_sheets/default_map_style';

export default class Tickit extends Component {
  render() {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text> Login </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text> Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
