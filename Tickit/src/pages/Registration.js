import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, AlertIOS, Alert } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import DisplayLatLng from './mapRender';
import Heading from '../components/Heading';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      plate_number: '',
      phone_number: '',
      registerCancelled: false
    };
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  registerPress() {
    this.setState({
      registerCancelled: true
    });
    fetch('https://tickit-back-end.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        plate_number: this.state.plate_number,
        phone_number: this.state.phone_number
      })
    })
      .then(this.handleErrors)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .catch(error => {
        Alert.alert('Something went wrong please try again.');
      })
      .done();
  }

  cancelRegisterPress() {
    this.setState({
      registerCancelled: true
    });
  }

  render() {
    if (this.state.registerCancelled === false) {
      return (
        <ScrollView style={styles.scroll}>
          <Heading text="Registration" />
          <Container>
            <Label text="Username" />
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
            />
          </Container>
          <Container>
            <Label text="License Plate Number" />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => this.setState({ plate_number: text })}
            />
          </Container>
          <Container>
            <Label text="Phone Number" />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => this.setState({ phone_number: text })}
            />
          </Container>
          <Container>
            <Label text="Email" />
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={text => this.setState({ email: text })}
            />
          </Container>
          <Container>
            <Label text="Password" />
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={text => this.setState({ password: text })}
            />
          </Container>
          <View style={styles.footer}>
            <Container>
              <Button
                label="Register"
                styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
                onPress={this.registerPress.bind(this)}
              />
            </Container>
            <Container>
              <Button
                label="CANCEL"
                styles={{ label: styles.buttonBlackText }}
                onPress={this.cancelRegisterPress.bind(this)}
              />
            </Container>
          </View>
        </ScrollView>
      );
    }

    if (this.state.registerCancelled === true) {
      return <DisplayLatLng />;
    }
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
    backgroundColor: '#ff7700',
    borderRadius: 8
  },
  footer: {
    marginTop: 50
  },
  textInput: {
    height: 40,
    fontSize: 20,
    backgroundColor: '#FFF'
  },
  scroll: {
    backgroundColor: '#FFF',
    padding: 30,
    flexDirection: 'column'
  }
});
