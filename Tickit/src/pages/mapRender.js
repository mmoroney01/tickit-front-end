'use strict';

import React, { Component } from 'react';
import MapView, { MAP_TYPES } from 'react-native-maps';
import { Alert, AppRegistry, StyleSheet, Text, TextInput, Image, View,  Dimensions, DatePickerIOS, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Fontawesomeicons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

var DateTimePicker = require('react-native-datetime').default;
var Button = require('@remobile/react-native-simple-button');

class DisplayLatLng extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
            latitude: 41.87625540000001,
            longitude: -87.65306249999998,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
      startingLatitude: 37.78825,
      startingLongitude: -122.4324,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
    };
    this.onSubmitPressed = this.onSubmitPressed.bind(this);
    this.onFindPressed = this.onFindPressed.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({ region: { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude }});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
    this.setState({lastPosition});
  });
  }

  onDateChange(date) {
    this.setState({date: date});
  }


  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  }

  onSubmitPressed() {
    fetch('https://tickit-back-end.herokuapp.com/parking_helper', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      })
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData.response);
        Alert.alert(responseData.response);
      })
      .done();
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsTraffic={true}
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.HYBRID}
          style={styles.map}
          initialRegion={{
            latitude: 41.87625540000001,
            longitude: -87.65306249999998,
            latitudeDelta:  0.0922,
            longitudeDelta: 0.0421
          }}
          onRegionChange={region => this.onRegionChange(region)}
        >
        </MapView>

        <View pointerEvents="none" style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
            <Icon
            pointerEvents="none"
            name='rowing'/>
        </View>

        <View>
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          style={buttonStyles.DatePickerIOS}
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
      </View>

      <View>
        <WithLabel>
          <Text
          style={buttonStyles.dateLabel}>{
            this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
      </View>

        <View style={styles.buttonContainer}>


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

var Heading = React.createClass({
  render() {
    return (
      <View style={buttonStyles.headingContainer}>
        <Text style={buttonStyles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
});

var WithLabel = React.createClass({
  render() {
    return (
      <View style={buttonStyles.labelContainer}>
        <View style={buttonStyles.labelView}>
          <Text style={buttonStyles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
});

const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

const buttonStyles = StyleSheet.create({
  DatePickerIOS: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    width: 250,
  },
  dateLabel: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
  },
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});

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
