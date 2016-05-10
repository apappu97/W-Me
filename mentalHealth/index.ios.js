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
      authenticated: undefined
    }
  }

  componentDidMount(){
    api.checkAuthentication().then((value) => {
      this.setState({
        loaded: true,
        authenticated: value
      })
    })
  }

  render() {
    if(this.state.loaded){
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
            title: 'Journal Buddy',
            component: Main,
            passProps: {userInfo: this.props}
          }} />
        )
      }
    } else{
      return( <View></View>);
    }
  }
};



AppRegistry.registerComponent('mentalHealth', () => mentalHealth);
