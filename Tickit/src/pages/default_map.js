import React, { Component } from 'react';

import MapView from 'react-native-maps';
import { styles, mapStyles } from '../style_sheets/default_map_style';

export default class DefaultMap extends Component {
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
