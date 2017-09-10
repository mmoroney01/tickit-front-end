import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');

const TEST_POLY = [
  {
    latitude: 41.85166332668032,
    longitude: -87.71499935503654
  },
  {
    latitude: 41.85164987733791,
    longitude: -87.71621899178687
  },
  {
    latitude: 41.85341147650741,
    longitude: -87.72480174257555
  },
  {
    latitude: 41.85166332668032,
    longitude: -87.71499935503654
  }
];
const ASPECT_RATIO = width / height;
const LATITUDE = 41.85166332668032;
const LONGITUDE = -87.71499935503654;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class PolygonCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polygons: TEST_POLY,
      editing: null,
      creatingHole: false
    };
  }

  render() {
    const mapOptions = {
      scrollEnabled: true
    };
    return (
      <View style={styles.container}>
        <MapView style={styles.map} mapType={MapView.MAP_TYPES.HYBRID} initialRegion={this.state.region}>
          <MapView.Polygon
            coordinates={this.state.polygons}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        </MapView>
      </View>
    );
  }
}

PolygonCreator.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

module.exports = PolygonCreator;
