/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableOpacity } from 'react-native';
import Login from './src/pages/Login';
import Registration from './src/pages/Registration';
import DefaultMap from './src/pages/default_map';

export default class Tickit extends Component {
  constructor(props) {
    super(props);

    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressRegister() {
    console.log('yo');
    return (
      <View>
        <Text> yo </Text>
      </View>
    );
  }

  render() {
    if (2 != 2) {
      return <Login />;
    } else {
      return <DefaultMap />;
    }
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
