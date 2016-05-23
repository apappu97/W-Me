var React = require('react-native');
var Separator = require('./Separator');

var {
  Platform,
  Switch,
  Text,
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      padding: 10,
      marginTop: 65
    },
    
  welcome: {
    /* Text style for "Welcome to..." */
    height: 14,
    color: "#043f83",
    fontFamily: 'Avenir',
    marginTop: 20,
    marginBottom: 40,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 14,
    backgroundColor: 'transparent'
  }, 
  switchtext:{
    color: "#043f83",
    fontFamily: 'Avenir',
 


  },
  switchbool: {



  }
});
class Notifications extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ANtrueSwitchIsOn: true,
      DPtrueSwitchIsOn: true,

    }

  }
  
  render() {
    return (
      <View style = {styles.mainContainer}> 
      <Text style={styles.switchtext}> Auto Notifications </Text>
        <Switch
        onValueChange={(value) => this.setState({ANtrueSwitchIsOn: value})}
         
          style={styles.switchbool}
          value={this.state.ANtrueSwitchIsOn} />
                   

        
        <Text style={styles.switchtext}> Daily Push Notifications </Text>
        <Switch
        onValueChange={(value) => this.setState({DPtrueSwitchIsOn: value})}
        
          value={this.state.DPtrueSwitchIsOn} />
      </View>
    )
  }
};


module.exports = Notifications;