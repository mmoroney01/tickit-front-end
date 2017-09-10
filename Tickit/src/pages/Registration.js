import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'dan12',
      email: 'dan12@dan.com',
      password: '123'
    };
  }

  registerPress() {
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.email);
    fetch('https://tickit-back-end.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
      })
      .done();
  }

  cancelRegisterPress() {
    console.log('cancelled mfer');
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <Label text="Registration" />
          <TextInput
            autocapitalize="none"
            style={styles.textInput}
            onChangeText={text => this.setState({ username: text })}
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
