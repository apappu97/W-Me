var React = require('react-native');
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

	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "#FFFFFF"
  	},
  	container: {
  		flex: 1,
  		alignSelf: 'center',
  		flexDirection: "row",
  		justifyContent: "space-between",
  		paddingRight: 25,
  		paddingLeft: 25,
  		paddingBottom: 25
  	}, 

	welcome: {
		/* Text style for "Welcome to..." */
		height: 14,
		color: "#043f83",
		fontFamily: 'Avenir',
		marginTop: 40,
		marginBottom: 40,
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
		/* Style for button */
		width: 207,
		height: 33,
		backgroundColor: "#5ca6f2",
		borderRadius: 16,
		alignSelf: 'center',
		
	},
  	usernameBox: {
		/* Style for "email" & "password"*/
		width: 207,
		
		alignSelf: 'center',
		backgroundColor: "#f7f4f4",
		marginTop: 5,
		borderWidth: 1,
		borderColor: "#979797",
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
			friend4Name: '',
			friend4Number: '',
			friend5Name: '',
			friend5Number: ''
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
	handleFourthName(event){
		this.setState({
			friend4Name: event.nativeEvent.text
		})
	}
	handleFourthNumber(event){
		this.setState({
			friend4Number: event.nativeEvent.text
		})
	}
	
	addFriends(){
		var Friends= require('./Friends');
		this.props.navigator.push({
			component: Friends,
			title: 'Friends',
			passProps: {
				userInfo: this.props
			}
		});
}
	render(){
		return(
			 <View style = {styles.mainContainer}>
					<Text style={styles.welcome}> Add Family and Friends </Text>
					
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend1Name}
						placeholder = " Name"
						onChange={this.handleFirstName.bind(this)} />
					</View>
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend1Number}
						placeholder = " Phone Number"
						onChange={this.handleFirstNumber.bind(this)} />
					</View>
					
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend2Name}
						placeholder = " Name"
						onChange={this.handleSecondName.bind(this)} />
					</View>
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend2Number}
						placeholder = " Phone Number"
						onChange={this.handleSecondNumber.bind(this)} />
					</View>
					
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend3Name}
						placeholder = " Name"
						onChange={this.handleThirdName.bind(this)} />
					</View>
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend3Number}
						placeholder = " Phone Number"
						onChange={this.handleThirdNumber.bind(this)} />
					</View>
					
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						value={this.state.friend4Name}
						placeholder = " Name"
						onChange={this.handleFourthName.bind(this)} />
					</View>
					<View style={styles.container}>
					<TextInput
						style={styles.usernameBox}
						keyboardType = 'numeric'
						value={this.state.friend4Number}
						placeholder = " Phone Number"
						onChange={this.handleFourthNumber.bind(this)} />
					</View>
					
					
					<TouchableHighlight
						style = {styles.submit}
						onPress = {this.addFriends.bind(this)}
						underlayColor = '#f1eeee'>
						<Text style = {styles.button}> Add Friends!</Text>
					</TouchableHighlight>
			</View>
		)
	}
}
module.exports = Friends;