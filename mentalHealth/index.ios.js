/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

var Main = require('./App/Components/Main');
var React = require('react-native');

var {
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
  render() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          title: 'Journal Buddy',
          component: Main
        }} />
    );
  }
};



AppRegistry.registerComponent('mentalHealth', () => mentalHealth);
