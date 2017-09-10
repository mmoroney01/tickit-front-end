import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import MapView from 'react-native-maps';
import { mapStyles } from '../components/default_map_style';

export default class DefaultMap extends Component {
  render() {
    return (
      <View style={mapStyles.container}>
        <MapView
          style={mapStyles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }
}
