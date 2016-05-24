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
	    padding: 30,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "#FFFFFF"
  	},
	button: {
		width: 157,

		color: "#fff",
		fontFamily: 'Avenir',
		alignSelf: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		fontSize: 20,
		marginTop: 12

	}, 
	submit: {
		/* Style for button */
		width: 300,
		height: 50,
		backgroundColor: "#d00920",
		borderRadius: 7,
		alignSelf: 'center',
		marginTop: 8
	},
  	usernameBox: {
		/* Style for "email" & "password"*/
		width: 300,
		borderRadius: 7,
		alignSelf: 'center',
		backgroundColor: "#FFFFFF",
		marginTop: 5,
		borderWidth: 1,
		borderColor: "#979797",
		height: 50,
	},
		password: {
		/* Style for "email" & "password"*/
		width: 207,
		height: 33,
		alignSelf: 'center',
		marginTop: 5,
		backgroundColor: "#f7f4f4",
		borderWidth: 1, 
		borderColor: "#979797"
	},
});
class LoginInfo extends React.Component{
	constructor(props){
		super(props); // calls component constructor
		this.state = {
			username: '',
			password: '',
			email: '',
			firstname: '',
			isLoading: false,
			error: false
		};
	}
	changeName(event){
		this.setState({
			firstname: event.nativeEvent.text // gets the input fro what's passed
		})
	}
	changeEmail(event){
		this.setState({
			email: event.nativeEvent.text // gets the input fro what's passed
		})
	}
	changeUsername(event){
		this.setState({
			username: event.nativeEvent.text // gets the input fro what's passed
		})
	}
	changePassword(event){
		var length = event.nativeEvent.text.length;
		var display = "";
		for(var i = 0; i < length; i++){
			display += "*";
		}
		this.setState({
			toDisplay: display,
			password: event.nativeEvent.text // gets the input from what's passed
		})
	}
	handleSubmit(){
		// load spinner
		this.setState({
			isLoading: true
		});
		api.createUser(this.state.username, this.state.password, this.state.fullname, this.state.email).then(() => {
			// handle login logic
			this.props.navigator.push({
				component: Profile,
				title: 'Profile',// username
				
				passProps: {
					userInfo: this.props,
					username: this.state.username,
					firstname: this.state.fullname
				}// whatever response is
			});
					// reset
			this.setState({
				isLoading: false,
				error: false,
				username: ''
			});
		})
	}
	render(){
		var showErr = (
			this.state.error ? <Text> {this.state.error} </Text> : <Text></Text>
		);
		return(
			<View style = {styles.mainContainer}>
			  <TextInput
			    style = {styles.usernameBox}
			    value = {this.state.firstname}
			    placeholder = " Full Name"	
			    onChange = {this.changeName.bind(this)} />
			  <TextInput
			    style = {styles.usernameBox}
			    value = {this.state.email}
			    placeholder = " Email"
			    onChange = {this.changeEmail.bind(this)} /> 
			  <TextInput
			  	placeholder = " Username"
			    style = {styles.usernameBox}
			    value = {this.state.username}
			    onChange = {this.changeUsername.bind(this)} /> 
			  <TextInput
			  placeholder = " Password"
			    style = {styles.usernameBox}
			    value = {this.state.toDisplay}
			    onChange = {this.changePassword.bind(this)} /> 
			  <TouchableHighlight
			    style = {styles.submit}
			    onPress = {this.handleSubmit.bind(this)}>
			      <Text style = {styles.button}> Update </Text>
			  </TouchableHighlight>
			  <ActivityIndicatorIOS
			    animating = {this.state.isLoading}
			    color = "#111"
			    size = "large"></ActivityIndicatorIOS>
			  {showErr}
			  </View>
		)
	}
}
module.exports = LoginInfo;
