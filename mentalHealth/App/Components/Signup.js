// Welcome to Journal Buddy!

var React = require('react-native');
var Profile = require('./Friends');
var api = require('./api');

var {
  StyleSheet,
  TextInput,
  ActivityIndicatorIOS,
  TouchableHighlight,
  Text,
  Image,
  View
} = React;

var styles = StyleSheet.create({
	mainContainer: {
	    flex: 1,
	    padding: 30,
	    marginTop: 65,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: 'white'
  	},
	usernameBox: {
		/* Style for "email" & "password"*/
		width: 207,
		height: 33,
		alignSelf: 'center',
		backgroundColor: "#f7f4f4",
		marginTop: 5,
		borderWidth: 1,
		borderColor: "#979797",
		
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
	welcome: {
		/* Text style for "Welcome to..." */
		width: 157,
		height: 14,
		color: "#043f83",
		fontFamily: 'Avenir',
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 14,
		marginBottom: 10
	}, 
	loginText: {
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
		backgroundColor: "#E63C1C",
		borderRadius: 16,
		alignSelf: 'center',
		marginTop: 10
		//boxShadow: 0 5px 4px rgba(0, 0, 0, 0.5)
	},
	signUp: {
		/* Text style for "Sign Up" */
		width: 70,
		height: 14,
		color: "#2c2b2b",
		fontFamily: 'Helvetica',
		fontSize: 12,
		fontWeight: "700",
		lineHeight: 14
	},
	image: {
		width: 55,
		height: 67,
		marginBottom: 15 ,
		alignSelf: 'center'
	}
});

class Signup extends React.Component{
	constructor(props){
		super(props); // calls component constructor
		this.state = {
			username: '',
			password: '',
			email: '',
			fullname: '',
			number: '',
			isLoading: false,
			error: false
		};
	}

	handleSetName(event){
		this.setState({
			fullname: event.nativeEvent.text // gets the input fro what's passed
		})
	}
	handleSetEmail(event){
		this.setState({
			email: event.nativeEvent.text // gets the input fro what's passed
		})
	}
	handleSetNumber(event){
		this.setState({
			number: event.nativeEvent.text
		})
	}
	handleSetUsername(event){
		this.setState({
			username: event.nativeEvent.text // gets the input fro what's passed
		})
	}

	handleSetPassword(event){
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
		api.createUser(this.state.username, this.state.password, this.state.fullname, this.state.email, this.state.number).then(() => {
			// handle login logic
			this.props.navigator.push({
				title: 'Add Friends',// username
				component: Profile,//
				passProps: {
					userInfo: this.props,
					username: this.state.username,
					firstname: this.state.fullname,
					phoneNumber: this.state.number
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

		return (
			<View style = {styles.mainContainer}>

		      <Image style={styles.image} source={require("../images/journal.jpg")}/>
			  <Text style = {styles.welcome} > Welcome to w/me! </Text>
			  <TextInput
			    style = {styles.usernameBox}
			    value = {this.state.fullname}
			    placeholder = " First Name"
			    onChange = {this.handleSetName.bind(this)} />
			  <TextInput
			    style = {styles.password}
			    value = {this.state.email}
			    placeholder = " Email"
			    onChange = {this.handleSetEmail.bind(this)} /> 
			    <TextInput
			  placeholder = " Phone Number"
			  	keyboardType = 'number-pad'
			    style = {styles.password}
			    value = {this.state.number}
			    onChange = {this.handleSetNumber.bind(this)} /> 
			  <TextInput
			  	placeholder = " Username"
			    style = {styles.password}
			    value = {this.state.username}
			    onChange = {this.handleSetUsername.bind(this)} /> 
			  <TextInput
			  placeholder = " Password"
			    style = {styles.password}
			    value = {this.state.toDisplay}
			    onChange = {this.handleSetPassword.bind(this)} /> 
			 
			  <TouchableHighlight
			    style = {styles.submit}
			    onPress = {this.handleSubmit.bind(this)}
			    underlayColor = 'white'>
			      <Text style = {styles.loginText}> Sign Up </Text>
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

module.exports = Signup;