/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { AppRegistry, Text, View } from 'react-native';
import { styles, mapStyles } from './components/style_sheets/default_map_style';
import { MapViews } from './components/map/default_map';

export default class Tickit extends Component {
  render() {
    return <Text> hey </Text>;
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
