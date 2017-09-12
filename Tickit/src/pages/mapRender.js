'use strict';

import React, { Component } from 'react';
import MapView, { MAP_TYPES } from 'react-native-maps';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
  DatePickerIOS,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import NavigationBar from 'react-native-navbar';

import Spinner from '../components/activity_indicator';
import Login from './Login';
import Registration from './Registration';

export default class DisplayLatLng extends React.Component {
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
      polygons: [],
      date: new Date(),
      timeZoneOffsetInHours: -1 * new Date().getTimezoneOffset() / 60,
      dateWheel: false,
      login: false,
      register: false,
    };
    this.onSubmitPressed = this.onSubmitPressed.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onDatePressed = this.onDatePressed.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onRegisterPressed = this.onRegisterPressed.bind(this);
    this.onLogOutPressed = this.onLogOutPressed.bind(this);
  }

  onLoginPressed() {
    this.setState({
      login: true
    });
  }

  onLogOutPressed(){
    this.setState({
      loggedIn: false
    });
  }

  onRegisterPressed() {
    this.setState({
      register: true
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        var initialPosition = position;
        this.setState({
          region: { latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude }
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
    });
  }

  onDateChange(date) {
    this.setState({ date: date });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onTimezoneChange(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({ timeZoneOffsetInHours: offset });
  }

  onDatePressed() {
    this.setState({
      dateWheel: true
    });
  }

  onSubmitPressed() {
    this.setState({
      dateWheel: false
    });

    this.setState({
      animating: false
    });

    fetch('https://tickit-back-end.herokuapp.com/parking_helper', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
        date: this.state.date
      })
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          animating: true
        });
        this.setState({ polygons: responseData.coordinates });
        Alert.alert(responseData.response);
      })
      .done();
  }

  render() {
    if (this.state.register === true) {
      return <Registration />;
    }
    if (this.state.login === true) {
      return <Login />;
    }

    return (
          <View style={styles.mapContainer}>
            <MapView
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsTraffic={true}
              provider={this.props.provider}
              ref={ref => {
                this.map = ref;
              }}
              style={styles.map}
              initialRegion={{
                latitude: 41.87625540000001,
                longitude: -87.65306249999998,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              onRegionChange={region => this.onRegionChange(region)}
            >
              <MapView.Polygon
                coordinates={this.state.polygons}
                strokeColor="#F00"
                fillColor="rgba(255,0,0,0.5)"
                strokeWidth={1}
              />
            </MapView>

            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent'
              }}
            >
              <Icon pointerEvents="none" name="person-pin-circle" color="#ff7700" size={40} />
            </View>

            <View style={styles.navContainer}>
              <NavigationBar
                leftButton={{
                  title: 'Log In',
                  tintColor: '#F08080',
                  style: { marginVertical: 20 },
                  handler: () => this.onLoginPressed()
                }}
                title={titleConfig}
                rightButton={{
                  title: 'Register',
                  tintColor: '#F08080',
                  style: { marginVertical: 20 },
                  handler: () => this.onRegisterPressed()
                }}
              />
            </View>

            {this.state.dateWheel === true &&
              <View>
                <DatePickerIOS
                  date={this.state.date}
                  mode="date"
                  style={styles.DatePickerIOS}
                  timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                  onDateChange={this.onDateChange}
                />
              </View>
            }
            {this.state.dateWheel === true &&
              <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={async () => this.onSubmitPressed()}
                    style={[styles.bubble, styles.button]}
                  >
                    <Text style={styles.buttonText}>Confirm Submission</Text>
                  </TouchableOpacity>
              </View>
            }

            {this.state.dateWheel === false &&
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={async () => this.onDatePressed()} style={[styles.bubble, styles.button]}>
                  <Text style={styles.buttonText}>Submit Location</Text>
                </TouchableOpacity>
              </View>
            }
            </View>
        );
    }
}

const titleConfig = {
  marginVertical: 20,
  title: 'Tick!t'
};

var Heading = React.createClass({
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{this.props.label}</Text>
      </View>
    );
  }
});

var WithLabel = React.createClass({
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
  buttonText: {
    textAlign: 'center'
  },
  DatePickerIOS: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    width: 250
  },
  heading: {
    fontWeight: '500',
    fontSize: 14
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8'
  },
  label: {
    fontWeight: '500'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  navContainer: {
    position: 'absolute',
    top: 0,
    width: 375
  }
});

module.exports = DisplayLatLng;
