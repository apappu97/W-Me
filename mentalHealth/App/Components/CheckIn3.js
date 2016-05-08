var React = require('react-native');
var Summary = require('./Summary');

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
	} 
});

class CheckIn3 extends React.Component{
	submitScore(score){
		this.props.navigator.push({
			component: Summary,
			title: 'Summary',
			passProps: { 
				userInfo: this.props.userInfo
			}
		});
	}
	
	render(){
		return(
			<View style = {styles.mainContainer}> 
			  <Image style={styles.image} source={require("../images/bindings.png")}>
				<Text style = {styles.welcome}> How are you feeling about the future? </Text>
				<View style = {styles.container1}>
				    <TouchableHighlight
					  onPress = {this.submitScore.bind(this, 1)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/smile.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 2)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/face.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 3)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/face.png")} />
					</TouchableHighlight>
				</View>
				<View style = {styles.container2}>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 4)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/face.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 5)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/face.png")} />
					</TouchableHighlight>
					<TouchableHighlight
					  onPress = {this.submitScore.bind(this, 6)}
					  underlayColor = '#f1eeee'>
					    <Image source = {require("../images/sad.png")} />
					</TouchableHighlight>
				</View>
			  </Image>
			</View>
		)
	}
}

module.exports = CheckIn3;