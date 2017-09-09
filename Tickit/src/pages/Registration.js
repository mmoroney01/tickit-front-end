import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  signInPress() {
    console.log(this.state.username);
    console.log(this.state.password);
    fetch('http://tickit-back-end.herokuapp.com/', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseData => {
        AlertIOS.alert('Login Success!', 'Cluck the button to get a Chick Norris Quite!');
      })
      .done();
  }

  cancelPress() {
    console.log('cancelled mfer');
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Container>
          <Label text="Registration" />
          <TextInput style={styles.textInput} onChangeText={text => this.setState({ username: text })} />
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
            <Button label="CANCEL" styles={{ label: styles.buttonBlackText }} onPress={this.cancelPress.bind(this)} />
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
