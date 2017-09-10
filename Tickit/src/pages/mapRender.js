import React, { Component } from 'react';
import MapView, { MAP_TYPES } from 'react-native-maps';
import { Alert, AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class DisplayLatLng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      startingLatitude: 37.78825,
      startingLongitude: -122.4324
    };
    this.onSubmitPressed = this.onSubmitPressed.bind(this);
    this.onFindPressed = this.onFindPressed.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
    this.setState({lastPosition});
  });
  }

  onSubmitPressed() {
    fetch("http://tickit-back-end.herokuapp.com/users/:id", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude
        })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
        })
      })
  }

  onFindPressed() {
    const newLatitude = this.state.startingLatitude;
    const newLongitude = this.state.startingLongitude;

    this.setState({
      region: {
        latitude: this.state.startingLatitude,
        longitude: this.state.startingLongitude
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.HYBRID}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
        >
          <MapView.Marker
          coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
          pinColor={'red'}
          style={markerStyles.mapMarker}/>
        </MapView>

        <View style={styles.buttonContainer}>

            <TouchableOpacity
              onPress={this.onFindPressed}
              style={[styles.bubble, styles.button]}>
              <Text style={styles.buttonText}>Find Your Location</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => this.onSubmitPressed()}
              style={[styles.bubble, styles.button]}
            >
              <Text style={styles.buttonText}>Submit Location</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const markerStyles = StyleSheet.create({
  mapMarker: {
    zIndex: 1000,
  },
  // The container is necessary to protect the markerHalo shadow from clipping
  container: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
    alignItems: 'center',
  },
  headingPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: ARROW_SIZE * 0.75,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    borderLeftColor: 'transparent',
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
});

const mapStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = DisplayLatLng;