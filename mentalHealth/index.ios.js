/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

var Main = require('./App/Components/Main');
var React = require('react-native');
var Signup = require('./App/Components/Signup');
var api = require('./App/Components/api');
var Profile = require('./App/Components/Profile');
const firebase = require("firebase");

var {
  AsyncStorage,
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});


class mentalHealth extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loadedCredentials: false,
      authenticated: undefined,
      username: '',
      firstname: ''
    }
  }

  componentDidMount(){
    api.checkAuthentication().then((value) => {
      this.setState({
        loaded: true,
        authenticated: value
      });
      api.getUsername().then((username) => {
          this.setState({
            username: username
          })
          api.getFirstName().then((fullname) => {
            this.setState({
              fullname: fullname,
              loadedCredentials: true
            })
          })
      });
    });
  }

  render() {
    //AsyncStorage.clear();
    if(this.state.loaded && this.state.loadedCredentials){
        if(!this.state.authenticated){ // no user
        return(
          <NavigatorIOS
            style = {styles.container}
            initialRoute={{
              title: 'Sign Up',
              component: Signup,
              passProps: {userInfo: this.props}
          }} />
        )
      } else{ //normal user
        return(
          <NavigatorIOS
          style = {styles.container}
          initialRoute={{
            title: 'Profile',
            component: Profile,
            passProps: {
              userInfo: this.props,
              username: this.state.username,
              firstname: this.state.fullname
            }
          }} />
        )
      }
    } else{
      return( <View></View>);
    }
  }
};



AppRegistry.registerComponent('mentalHealth', () => mentalHealth);
