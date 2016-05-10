var React = require('react-native');
var Friends = require('./Friends');
var Settings= require('./Settings');

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
		height: 395
  	},
  	container1: {
  		flex: 1,
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 50,
  		paddingLeft: 50,
  		paddingTop: 50
  	}, container2: {
  		flex: 1,
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 50,
  		paddingLeft: 50,
  		paddingBottom: 100
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
class Summary extends React.Component{
	
	reachOut(){
		this.props.navigator.push({
			component: Friends,
			title: 'Reach Out',
			//passProps: { 
			//	userInfo: this.props.userInfo
			//}
		});
	}
	getDailyTip(){
		this.props.navigator.push({
			component: Settings,
			title: 'Get Daily Tip',
			//passProps: { 
				//userInfo: this.props.userInfo
			//}
		});
	}
	render(){
		return(
		  <View style = {styles.mainContainer}> 
		    <Image style={styles.image} source={require("../images/bindings.png")}>
		    <Text style = {styles.welcome}> Weekly Report John Doe </Text>
		    
		    
		    <Text style = {styles.welcome}> Looks like youve had a rough week  </Text>
		    <TouchableHighlight
		    	style = {styles.submit}
				onPress = {this.reachOut.bind(this)}
				underlayColor = '#f1eeee'>
				<Text style={styles.button}>Reach Out To Friends</Text>
			</TouchableHighlight>			
			<TouchableHighlight
				style = {styles.submit}
				onPress = {this.getDailyTip.bind(this)}
				underlayColor = '#f1eeee'>
				<Text style={styles.button}> Daily Tip</Text>
			</TouchableHighlight>
		</Image>
		  </View>
		)
	}
};
module.exports = Summary;