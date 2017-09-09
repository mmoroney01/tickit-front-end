import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

export default class Login extends Component {
  press() {
    console.log('FUCK YOU ALL');
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <Label text="Username or Email" />
          <TextInput style={styles.textInput} />
        </Container>
        <Container>
          <Label text="Password" />
          <TextInput secureTextEntry={true} style={styles.textInput} />
        </Container>
        <View style={styles.footer}>
          <Container>
            <Button
              label="Sign In"
              styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
              onPress={this.press.bind(this)}
            />
          </Container>
          <Container>
            <Button label="CANCEL" styles={{ label: styles.buttonBlackText }} onPress={this.press.bind(this)} />
          </Container>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 20,
    color: '#595856'
  },
  primaryButton: {
    backgroundColor: '#34A853'
  },
  footer: {
    marginTop: 100
  },
  textInput: {
    height: 80,
    fontSize: 30,
    backgroundColor: '#FFF'
  },
  scroll: {
    backgroundColor: '#FFF',
    padding: 30,
    flexDirection: 'column'
  }
});
