/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { AppRegistry, Text, View } from 'react-native';
import { styles, mapStyles } from './components/style_sheets/default_map_style';

export default class Tickit extends Component {
  render() {
    return (
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      />
    );
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
