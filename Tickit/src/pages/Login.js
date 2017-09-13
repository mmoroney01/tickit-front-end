import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, AlertIOS, Alert } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import DisplayLatLngLogIn from './mapRenderLogin';
import DisplayLatLng from './mapRender';
import Heading from '../components/Heading';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginCancelled: false
    };
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  signInPress() {
    this.setState({
      loggedIn: true
    });
    fetch('https://tickit-back-end.herokuapp.com/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(this.handleErrors)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ auth_token: responseData.auth_token });
        Alert.alert(responseData.response);
        this.setState({
          loginCancelled: true
        });
      })
      .catch(error => {
        console.log(error);
      })
      .done();
  }

  cancelLoginPress() {
    this.setState({
      loginCancelled: true
    });
  }

  render() {
    if (this.state.loginCancelled === false) {
      return (
        <ScrollView style={styles.scroll}>
          <Heading text="Login" />
          <Container>
            <Label text="Email" />
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
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
                label="Sign In"
                styles={{ button: styles.primaryButton, label: styles.buttonWhiteText }}
                onPress={this.signInPress.bind(this)}
              />
            </Container>
            <Container>
              <Button
                label="CANCEL"
                styles={{ label: styles.buttonBlackText }}
                onPress={this.cancelLoginPress.bind(this)}
              />
            </Container>
          </View>
        </ScrollView>
      );
    }

    if (this.state.loggedIn === true) {
      return <DisplayLatLngLogIn auth_token={this.state.auth_token} />;
    }

    if (this.state.loginCancelled === true) {
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
