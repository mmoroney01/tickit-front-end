/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { AppRegistry, Text, View, TouchableOpacity } from 'react-native';
import Login from './src/pages/Login';
import Registration from './src/pages/Registration';
import { styles, mapStyles } from './components/style_sheets/default_map_style';

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
    return (
      <View>
        <Login />
        <Registration />
      </View>
    );
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
