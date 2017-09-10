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
import PolygonMap from './src/pages/polygon_overlay';
import DisplayLatLng from './src/pages/mapRender';
import DisplayWithPin from './src/pages/mapRender';


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
      return <DisplayLatLng />;
    }
  }
}

AppRegistry.registerComponent('Tickit', () => Tickit);
