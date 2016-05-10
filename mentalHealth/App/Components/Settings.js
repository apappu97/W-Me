var React = require('react-native');
var Friends = require('./Friends');

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
	    padding: 30,
	    marginTop: 65,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "#9b9b9b"
  	},
  	image: {
  		width: 285,
		height: 395,
  	},
  	settings: {
  		left: 250
  	},
	welcome: {
		/* Text style for "Welcome to..." */
		height: 14,
		color: "#043f83",
		fontFamily: 'Avenir',
		marginTop: 40,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 14,
		backgroundColor: 'transparent'
	}, 
	button: {
		width: 157,
		height: 14,
		color: "#fff",
		fontFamily: 'Avenir',
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 14,
		marginTop: 8
	}, 
	submit: {
		/* Style for "Login" button */
		width: 207,
		height: 33,
		backgroundColor: "#5ca6f2",
		borderRadius: 16,
		alignSelf: 'center',
		marginTop: 20
	},
		manage: {
		/* Style for "Login" button */
		width: 207,
		height: 33,
		backgroundColor: "#5ca6f2",
		borderRadius: 16,
		alignSelf: 'center',
		marginTop: 100
	}
});
class Settings extends React.Component{
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
			component: Privacy,
			title: 'Privacy Settings',
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
			
			  <Image style={styles.image} source={require("../images/bindings.png")}>
				    <TouchableHighlight
				      style = {styles.manage}
				      onPress = {this.manageFriends.bind(this)}
				      underlayColor = 'f1eeee'>
				        <Text style = {styles.button}> Manage Friend Circle </Text>
				    </TouchableHighlight>
				  <TouchableHighlight
				      style = {styles.submit}
				      onPress = {this.changePrivacy.bind(this)}
				      underlayColor = 'fleeee'>
				        <Text style = {styles.button}> Privacy Settings </Text>
				    </TouchableHighlight>
				  <TouchableHighlight
				      style = {styles.submit}
				      onPress = {this.changeNotifications.bind(this)}
				      underlayColor = 'fleeee'>
				        <Text style = {styles.button}> Notification Settings </Text>
				    </TouchableHighlight>
			  </Image>
			</View>
		)
	}
}
module.exports = Settings;