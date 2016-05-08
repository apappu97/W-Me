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
		marginTop: 10
	}
});

class Settings extends React.Component{
	addFriends(){
		this.props.navigator.push({
			component: Friends,
			title: 'Add Friends',
			passProps: { 
				userInfo: this.props.userInfo
			}
		})
	}
	render(){
		return(
			<View> 
			  <Image style={styles.image} source={require("../images/bindings.png")}>
				  <View style = {styles.mainContainer}>
				    <TouchableHighlight
				      style = {styles.submit}
				      onPress = {this.addFriends.bind(this)}
				      underlayColor = 'transparent'>
				        <Text style = {styles.button}> Add Friends </Text>
				    </TouchableHighlight>
				  </View>		    
				  <TouchableHighlight
				      style = {styles.submit}
				      onPress = {this.addFriends.bind(this)}
				      underlayColor = 'transparent'>
				        <Text style = {styles.button}> View Profile </Text>
				    </TouchableHighlight>
			  </Image>
			</View>
		)
	}
}

module.exports = Settings;