/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Login from './src/pages/Login';
import Registration from './src/pages/Registration';
import DefaultMap from './src/pages/default_map';
import PolygonMap from './src/pages/polygon_overlay';
import DisplayLatLng from './src/pages/mapRender';
import DisplayWithPin from './src/pages/mapRender';
import SplashScreen from 'react-native-splash-screen'
import Button from './src/components/Button';

export default class Tickit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreed: false
    };
    this.onAgreeClick = this.onAgreeClick.bind(this);
  }

  onAgreeClick(){
    this.setState({
      agreed: true
    });
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    if(this.state.agreed === false){
      return(
        <View>
          <View style={styles.termsContainer}>
            <Text style={styles.terms}>TERMS AND CONDITIONS</Text>
          </View>
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimer}>
            Tick!t, 2017. As a condition of use, you (hereafter "the user") shall not bring to bear legal action of any sort upon the developers of Tick!t (hereafter "the devs"). Tick!t claims no responsibility for loss of money and/or bodily autonomy incurred by the receipt of parking tickets as a result of user failure to comply with local laws and/or ordinances.</Text>
          </View>

          <View style={styles.buttonContainer}>
              <Button
                label="Accept"
                styles={{ button: styles.button, label: styles.buttonWhiteText }}
                onPress={async () => this.onAgreeClick()}
              />
           </View>
         </View>
      );
    }
     if(this.state.agreed === true){
      return <DisplayLatLng />;
    }
  }

}

const styles = StyleSheet.create({
  button: {
      position: 'absolute',
      left: 50,
      right: 50,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      backgroundColor: '#ff7700',
      borderRadius: 8
    },
    buttonContainer: {
      position: 'absolute',
      top: 420,
      left: 50,
      right: 50,
      bottom: 50,
    },
    disclaimer: {
      color: 'orange',
      fontSize: 19
    },
    disclaimerContainer: {
      position: 'absolute',
      top: 140,
      left: 50,
      right: 50,
      bottom: 50,
    },
    termsContainer: {
      position: 'absolute',
      top: 100,
      left: 50,
      right: 50,
      bottom: 50,
      alignItems: 'center',
    },
    terms: {
      color: 'orange',
      fontSize: 21,
    }
});

AppRegistry.registerComponent('Tickit', () => Tickit);
