import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default class App extends React.Component {
  fetch_login(login, pass){
    fetch('http://176.213.36.17:28015/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': ''
  },
      body: JSON.stringify({
        email: login,
        password: pass,
      })
    }).then((response) =>{console.log(login+" "+pass); console.log(response)});
  }
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('C:/Users/Nikolay/Documents/ExpoProject/filesroragemobile/res/images/lock_logo.png')}
          />
          <Text>Hee1323343434343431e</Text>
        </View>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView behavior="padding">
          <View style={styles.loginContainer}>
            <Text>Login:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({email: text})}
            />
            <Text>Password:</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => this.setState({password: text})}
            />
            <TouchableOpacity onPress={() => {this.fetch_login(this.state.email, this.state.password);console.log("hello world");}}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>SignIn</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1'
  },
  logo: {
    width: 125,
    height: 125
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  formContainer: {

  },
  input: {
    height: 40,
    backgroundColor: '#bdc3c7',
    marginBottom: 20,
    borderRadius: 5
  },
  loginContainer: {
    padding: 20
  },
  buttonContainer: {
    backgroundColor: '#7f8c8d',
    paddingVertical: 10,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700'
  },
});
