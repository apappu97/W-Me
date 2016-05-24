var React = require('react-native');
var Settings = require('./Settings');
var api = require('./api');
var Profile = require('./Profile');
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
  	container3: {
  		flex: 1,
 		flexDirection: "row",
 		right: 10
  	},
  	 settings: {
  		left: 250
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
	} 
});

class CheckIn3 extends React.Component{
	wait(){
		counter++;
	}

	submitScore(score){
		var newScore = this.props.score + score;
		console.log("submitting score");
		api.setScore(newScore).then(() => {
			console.log("entering weekly score");
			api.getWeeklyScore().then((total) => {
				console.log("finished weekly score");
				console.log("in checkin3");
				console.log("entering list of friends");
				api.getListOfFriends(total, function(sadFriend){
					console.log(sadFriend + "IS REALLY SAD");
					if(sadFriend !== "") api.schedulePushNotification(sadFriend);
				}).then((sadFriend) => {
					this.props.navigator.push({
						component: Profile,
						title: 'Profile',
						passProps: {
							userInfo: this.props.userInfo
						}
					})
					console.log("finished list of friends");
					// var counter = 0;
					// while(counter < 5){
					// 	setTimeout(this.wait(), 1000);
					// 	//console.log("watig");
					// }
					console.log(sadFriend);
					//console.log(typeof(sadFriend));
					console.log(api.sadFriend);
					//if(sadFriend != "") api.schedulePushNotification(sadFriend);
					console.log("finished sad friend comparison");
				})
			});
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
		console.log(this.props);
		console.log("requesting permissions");
		PushNotificationIOS.requestPermissions();
		return(
			<View style = {styles.mainContainer}> 
	
				<Text style = {styles.welcome}> How are you feeling about the future? </Text>
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

module.exports = CheckIn3;