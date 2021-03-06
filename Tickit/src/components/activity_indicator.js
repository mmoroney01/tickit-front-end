import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class Spinner extends Component {
   state = { animating: true };

   render() {
      const animating = this.state.animating;
      return (
         <View style={styles.container}>
            <ActivityIndicator animating={animating} color="#ff7700" size="large" style={styles.activityIndicator} />
         </View>
      );
   }
}

export default Spinner;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 105
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
});
