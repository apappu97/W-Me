var React = require('react-native');
var Friends = require('./Friends');
var Notifications = require('./Notifications');
var LoginInfo = require('./LoginInfo');


var {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;
var styles = StyleSheet.create({
	mainContainer: {
	    flex: 1,
	    marginTop: 65,
	    
	    backgroundColor: "white"
  	},
  	image: {
  		width: 285,
		height: 395,
  	},
	buttonText: {
		width: 157,
		
		flex: 1,
		color: "#fff",
		fontFamily: 'Avenir',
		textAlign: 'center',
		marginTop: 35,
		fontSize: 18,
	}, 
	  settingsText: {
    	fontSize: 24,
    	color: 'black',
    	alignSelf: 'center'
  		},
      settingsBackground: {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex:3
  }

});
class Settings extends React.Component{
	makeBackground(btn){
    			var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      height: 100,
      marginTop: 10,

   
      
      
  
    			}
    		if(btn === 0){
      			obj.backgroundColor = '#FFFFFF';
    		} else if (btn === 1){
      			obj.backgroundColor = '#F88C1C';
    		} else  if (btn ===2){
      			obj.backgroundColor = '#F05A1C';
    		} else {
    			obj.backgroundColor = '#D0021B';
    		}
    		return obj;
 			}
	manageFriends(){
		this.props.navigator.push({
			component: Friends,
			title: 'Manage Friend Circle',
			passProps: { 
				userInfo: this.props.userInfo
			}
		});
	}
	changePrivacy(){
		this.props.navigator.push({
			component: LoginInfo,
			title: 'Update Info',
			passProps: { 
				userInfo: this.props.userInfo
			}
		});
	}
	changeNotifications(){
		this.props.navigator.push({
			component: Notifications,
			title: 'Notification Settings',
			passProps: { 
				userInfo: this.props.userInfo
			}
		});
	}
	render(){
			return(
				<View style = {styles.mainContainer}> 
	  			
				    <TouchableHighlight
				      style = {this.makeBackground(1)}
				      onPress = {this.manageFriends.bind(this)}>
				        <Text style = {styles.buttonText}> Manage Friend Circle </Text>
				    </TouchableHighlight>
				  <TouchableHighlight
				      style = {this.makeBackground(2)}
				      onPress = {this.changePrivacy.bind(this)}>
				        <Text style = {styles.buttonText}> Login Info </Text>
				    </TouchableHighlight>
				  <TouchableHighlight
				      style = {this.makeBackground(3)}
				      onPress = {this.changeNotifications.bind(this)}>
				        <Text style = {styles.buttonText}> Notification Settings </Text>
				    </TouchableHighlight>
			</View>
		)
	}
}
module.exports = Settings;