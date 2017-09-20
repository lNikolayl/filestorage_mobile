import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, FlatList, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class App extends React.Component {
  fetch_login(login, pass, navigate){
    fetch('http://176.213.36.17:28015/mlogin',{
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
    }).then((response) => {
      this.setState({isLoading: false});
      var body = response._bodyText;
      if (body!="Wrong email or password!!!"){
        var res = JSON.parse(response._bodyText);
        this.setState({username: res.username, files: res.files});
        navigate('Profile',{username: res.username, files: res.files});
      } else {
        navigate('Wrong');
      }

    })
    .catch((error) => {
      console.error(error);
    });
  }
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      files: [],
      isLoading: false
    };
  }
  loading(){
    return(
      <ActivityIndicator
          animating={true}
          color={'#000'}
          size={'small'}
          style={{margin: 15}} />

   );
  }
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading){
      return(this.loading());
    }
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('C:/Users/Nikolay/Documents/ExpoProject/filesroragemobile/res/images/lock_logo.png')}
          />
          <Text>He000</Text>
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
            <TouchableOpacity onPress={() => {this.fetch_login(this.state.email, this.state.password, navigate); this.setState({isLoading: true});}}
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

class Wrong extends React.Component {
  render(){
    return(
      <Text>Wrong login data!</Text>
    );
  }
}

class Profile extends React.Component {
  refreshProfile(){
    // fetch('http://176.213.36.17:28015/mlogin',{
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Origin': ''
    //   }
    // }).then((response) => (console.log(response)))
    // .catch((error) => {
    //   console.error(error);
    // });
  }
  constructor(props){
    super(props);

  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Your profile',
    headerRight: <Button title="Refresh" onPress={() => (this.refreshProfile())} />
  });
  render(){
    const { params } = this.props.navigation.state;
    return(
      <View>
        <Text style={styles.profileName}>{params.username}</Text>
        <FlatList
          data={params.files}
          renderItem={({item}) => <Text style={styles.profileFiles}>{item}</Text>}
        />
      </View>
    );
  }
}


export default SimpleApp = StackNavigator({
  App: { screen: App },
  Wrong: { screen: Wrong },
  Profile: {screen: Profile }
});

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
  profileName: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700'
  },
  profileFiles: {
    fontSize: 15,
    fontWeight: '600'
  },
});
