var React = require('react-native');
var Friends = require('./Friends');
var Settings= require('./Settings');
var WebView = require('./WebView');


var {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  WebView
} = React;

var styles = StyleSheet.create({
	mainContainer: {
	    flex: 1,
	    
	    marginTop: 65,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    backgroundColor: "white"
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

	summaryButtons:{
	  flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      height: 100,
      marginTop: 150,
	},
	buttonText: {
		width: 157,
		
		flex: 1,
		color: "#fff",
		fontFamily: 'Avenir',
		textAlign: 'center',
		marginTop: 35,
		fontSize: 18,
	}, 
		image: {
		width: 300,
		height: 240,
		marginBottom: 15 ,
		alignSelf: 'center'
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
		
openPage(url){
    this.props.navigator.push({
      component: WebView,
      title: '',
      passProps: {url}
    });
    }
    		    makeBackground(btn){
    			var obj = {
      				flexDirection: 'row',
     				alignSelf: 'stretch',
     				justifyContent: 'center',
      				height: 100,
      				marginTop: 10,
  
    			}
    		if(btn === 0){
      			obj.backgroundColor = '#FFFFFF';
    		} else if (btn === 1){
      			obj.backgroundColor = '#F88C1C';
    		} else  if (btn ===2){
      			obj.backgroundColor = '#F05A1C';
    		} else {
    			obj.backgroundColor = '#D0021B';
    		}
    		return obj;
 			}
		
	render(){
		return(
		  <View style = {styles.mainContainer}> 
		  <Text style = {styles.welcome} > Weekly Wellbeing Report </Text>
		  <Image style={styles.image} source={require("../images/Graph.png")}/> 
		    
		    
		    <Text style = {styles.welcome}> Looks like you have had a rough week  </Text>

		    <TouchableHighlight
		    	style = {this.makeBackground(1)}
				onPress = {this.reachOut.bind(this)}
				underlayColor = '#f1eeee'>
				<Text style= {styles.buttonText}>Reach Out To Friends</Text>
			</TouchableHighlight>			
			<TouchableHighlight
				style = {this.makeBackground(2)}
				onPress = {this.openPage.bind(this, 'https://stanfordbridge.wordpress.com/resources/')}
				underlayColor = '#f1eeee'>
				<Text style= {styles.buttonText}> Additional Resources</Text>
			</TouchableHighlight>
		  </View>
		)
	}
};
module.exports = Summary;