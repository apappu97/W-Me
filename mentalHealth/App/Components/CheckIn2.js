var React = require('react-native');
var CheckIn3 = require('./CheckIn3');
var api = require('./api');

var {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  PushNotificationIOS
} = React;

var styles = StyleSheet.create({
	mainContainer: {
	    flex: 1,
	    padding: 30,
	    marginTop: 65,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "#FFFFFF"
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
		
		color: "#043f83",
		fontFamily: 'Avenir',
		marginTop: 40,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
	
		backgroundColor: 'transparent'
	},
	  	container3: {
  		flex: 1,
 		flexDirection: "row",
 		right: 10
  	},
  	settings: {
  		left: 250
  	},
});

class CheckIn2 extends React.Component{
	submitScore(score){
		var newScore = this.props.score + score;
		this.props.navigator.push({
			component: CheckIn3,
			title: 'Check In',
			passProps: { 
				userInfo: this.props.userInfo,
				score: newScore
			}
		});
	}
		changeSettings(){
		this.props.navigator.push({
			component: Settings,
			title: 'Settings',
			passProps: {
				userInfo: this.props.userInfo
			}
		})
	}
	render(){
		api.updateAuthToken();
		return(
			<View style = {styles.mainContainer}> 
				<Text style = {styles.welcome}> How has your past week been? </Text>
				<View style = {styles.container1}>
				    <TouchableHighlight
					  onPress = {this.submitScore.bind(this, 1)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile1.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 2)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile2.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 3)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile3.png")} />
					</TouchableHighlight>
				</View>
				<View style = {styles.container2}>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 4)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile4.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 5)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile5.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 6)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/Smile6.png")} />
					</TouchableHighlight>
				</View>
			  				<View style = {styles.container3}>
				  <TouchableHighlight
				    onPress = {this.changeSettings.bind(this)}
				    underlayColor = 'transparent'>
				      <Image style = {styles.settings} source = {require("../images/setting.png")} />
				  </TouchableHighlight>
				</View>
			</View>
		)
	}
}

module.exports = CheckIn2;