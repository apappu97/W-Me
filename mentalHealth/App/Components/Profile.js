var React = require('react-native');
var CheckIn1 = require('./CheckIn1');
var Settings = require('./Settings');
var Summary = require('./Summary');
var api = require('./api');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  PushNotificationIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Profile extends React.Component{
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }
  goToCheckIn(){
    var CheckIn1 = require('./CheckIn1');
    this.props.navigator.push({
      component: CheckIn1,
      title: "Check In",
      passProps: {userInfo: this.props}
    });
  }
  goToSettings(){
        this.props.navigator.push({
          component: Settings,
          title: "Settings",
          passProps: {userInfo: this.props}
        });
  }
  goToWeeklySummary(){
        this.props.navigator.push({
          component: Summary,
          title: 'Weekly Summary',
          passProps: {userInfo: this.props}
        });
  }

  render(){
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Image source= {require("../images/smiley.jpg")} style={styles.image}/>
        <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToCheckIn.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Check In</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.goToWeeklySummary.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>Weekly Summary</Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackground(2)}
            onPress={this.goToSettings.bind(this)}
            underlayColor="#9BAAF3">
              <Text style={styles.buttonText}>Settings</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

Profile.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = Profile;