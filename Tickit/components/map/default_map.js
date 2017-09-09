import React, { Component } from 'react';
import MapView from 'react-native-maps';

class MapViews extends Component {
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
