var React = require('react-native');
var Settings= require('./Settings');
var api = require('./api');

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
	    padding: 120,
	    marginTop:20,

	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "#FFFFFF"
  	},
  	container1: {
  		flex: 1,
  		alignSelf: 'center',
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 25,
  		paddingLeft: 25,
  
  	}, 
  	container2: {
  		flex: 1,
  		alignSelf: 'center',
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 25,
  		paddingLeft: 25,
  		paddingBottom: 15
  	}, 

	button: {
		width: 157,

		color: "#fff",
		fontFamily: 'Avenir',
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: 16,
		marginTop: 12

	}, 
	submit: {
		/* Style for button */
		width: 300,
		height: 50,
		backgroundColor: "#E63C1C",
		borderRadius: 7,
		alignSelf: 'center',
		
	},
  	usernameBox: {
		/* Style for "email" & "password"*/
		width: 300,
		
		alignSelf: 'center',
		backgroundColor: "#FFFFFF",
		marginTop: 5,
		borderWidth: 1,
		borderColor: "#979797",
		borderRadius: 7,
		height: 50,
		
		
	}
});
class Friends extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			friend1Name: '',
			friend1Number: '',
			friend2Name: '',
			friend2Number: '',
			friend3Name: '',
			friend3Number: '',

		};
	}
	handleFirstName(event){
		this.setState({
			friend1Name: event.nativeEvent.text
		})
	}
	handleFirstNumber(event){
		this.setState({
			friend1Number: event.nativeEvent.text
		})
	}
	handleSecondName(event){
		this.setState({
			friend2Name: event.nativeEvent.text
		})
	}
	handleSecondNumber(event){
		this.setState({
			friend2Number: event.nativeEvent.text
		})
	}
	handleThirdName(event){
		this.setState({
			friend3Name: event.nativeEvent.text
		})
	}
	handleThirdNumber(event){
		this.setState({
			friend3Number: event.nativeEvent.text
		})
	}

	
	addFriends(){
		var Profile = require('./Profile');
		console.log("number inside addFriends function");
		console.log(this.state.friend1Number);
		api.addFriends(this.state.friend1Number).then(() => {
			this.props.navigator.push({
				component: Profile,
				title: 'Profile',
				passProps: {
					userInfo: this.props
				}
			});
		});
}
	render(){
		return(
			 <View style = {styles.mainContainer}>
					<View style={styles.container1}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend1Name}
						placeholder = " Name"
						onChange={this.handleFirstName.bind(this)} />
					</View>
					<View style={styles.container2}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend1Number}
						placeholder = " Phone Number"
						onChange={this.handleFirstNumber.bind(this)} />
					</View>
					
					<View style={styles.container1}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend2Name}
						placeholder = " Name"
						onChange={this.handleSecondName.bind(this)} />
					</View>
					<View style={styles.container2}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend2Number}
						placeholder = " Phone Number"
						onChange={this.handleSecondNumber.bind(this)} />
					</View>
					
					<View style={styles.container1}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend3Name}
						placeholder = " Name"
						onChange={this.handleThirdName.bind(this)} />
					</View>
					<View style={styles.container2}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend3Number}
						placeholder = " Phone Number"
						onChange={this.handleThirdNumber.bind(this)} />
					</View>
					
					
					<TouchableHighlight
						style = {styles.submit}
						onPress = {this.addFriends.bind(this)}
						underlayColor = '#f1eeee'>
						<Text style = {styles.button}> Add Friends</Text>
					</TouchableHighlight>
			</View>
		)
	}
}
module.exports = Friends;