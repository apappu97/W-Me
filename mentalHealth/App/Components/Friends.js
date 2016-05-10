var React = require('react-native');


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
  	container1: {
  		flex: 1,
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 50,
  		paddingLeft: 50,
  		paddingTop: 50
  	}, 
  	container2: {
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
		marginBot: 40,
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
	},
	textInput: {
    	height: 50,
    	padding: 4,
    	marginRight: 5,
    	fontSize: 23,
    	borderWidth: 1,
    	borderColor: 'white',
    	borderRadius: 8,
    	color: 'white'
  }
});
class Friends extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			friendName: '',
			friendNumber: ''
		};
	}

	handleName(event){
		this.setState({
			friendName: event.nativeEvent.text
		})
	}

	handleNumber(event){
		this.setState({
			friendNumber: event.nativeEvent.text
		})
	}


	addFriends(){
		var Settings= require('./Settings');

		//update backend
		this.props.navigator.push({
			component: Settings,
			title: 'Settings',
			passProps: {
				userInfo: this.props.userInfo
			}
		});
	}

	render(){
		return(
			<View style = {styles.mainContainer>
				<Image style={styles.image} source={require("../images/bindings.png")}>
					<Text style={styles.welcome}> Add Family and Friends </Text>

					<View style={styles.container1}>
					<Text> Name </Text>
					<TextInput
						style={styles.textInput}
						value={this.state.friendName}
						onChange={this.handleName.bind(this)} />
					</View>

					<View style={styles.container2}>
					<Text> Number </Text>
					<TextInput
						style={styles.textInput}
						keyboardType = 'numeric'
						value={this.state.friendNumber}
						onChange={this.handleNumber.bind(this)} />
					</View>

					<TouchableHighlight
						style={styles.submit}
						underlayColor = '#f1eeee'
						onPress = {this.addFriends.bind(this)}
						<Text style = {styles.button}> Add Friend</Text>
					</TouchableHighlight>
				</Image>
			 </View>
		)
	}
}
module.exports = Friends;