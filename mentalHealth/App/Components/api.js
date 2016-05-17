var React = require('react-native');
var Firebase = require("firebase");

var ref = new Firebase("https://socialgoodmh.firebaseio.com/");

var usermapRef = ref.child("user_map");
var usersRef = ref.child("users");

var {
    AsyncStorage
} = React;

var _checkAuthentication = function(){
        return _getUsername();
};

var _createUser = function(username, password, firstname, email) {
        if (typeof username != "string" || typeof password != "string") {
                throw "Username and/or password isn't a string";
        }
        ref.createUser({
            username: username,
            password : password,
            firstname: firstname,
            email    : email
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
                return false;
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                _auth = userData;
                AsyncStorage.setItem("username", username).then((value) => {
                    AsyncStorage.setItem("password", password).then(() => {
                        AsyncStorage.setItem("firstname", firstname).then(() => {
                            AsyncStorage.setItem("email", email).then(() => {
                                _storeAuthToken(userData.uid).then(() => {
                                    // credentials updated, login now
                                    return _login(email, password, _setUpUser, firstname, email);
                                })
                            })
                        })
                    })
                })

            }
        });
};

var _setUpUser = function(firstname, email) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var localUserRef = usersRef.child(_auth.uid);
        localUserRef.set({
            "score": 0,
            "days": 0,
        }, function() {
            console.log("set up a user");
        });
        var user_map = ref.child("user_map");
        user_map.push({
            name : firstname,
            uid : _auth.uid,
            email: email
        });
        console.log("about to return asyncstorage setitem promise");
        return AsyncStorage.setItem("setUpUserDone", "1");
};

var _getUsername = function(){
        return AsyncStorage.getItem("username");
};

var _getPassword = function(){
        return AsyncStorage.getItem("password");
};

var _getFirstName = function(){
    return AsyncStorage.getItem("firstname");
}

var _storeAuthToken = function(authToken){
    return AsyncStorage.setItem("authToken", authToken);
};

var _getAuthToken = function(){
    return AsyncStorage.getItem("authToken");
};

var _login = function(username, password, callback, firstname, email) {
        ref.authWithPassword({
            email    : username,
            password : password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                switch (error.code) {
                    case "INVALID_EMAIL":
                        console.log("The specified user account email is invalid.");
                        break;
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        break;
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        break;
                    default:
                        console.log("Error logging user in:", error);
                }
            } else {
                console.log("Authenticated successfully with payload:", authData);
                _auth = authData;
                _storeAuthToken(_auth.uid).then(() => {
                    if (typeof callback === "function") {
                        console.log("returning setupuser");
                        return callback(firstname, email);
                    }
                })
            }
        });
};

var _isThereData = function() {
        usersRef.on("value", function(snapshot) {
            console.log(snapshot.val());
            return true;
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            return false;
        });
};


var _getUserInfo = function(callback) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        localUserRef = usersRef.child(_auth.uid);
        var userInfo = null;
        localUserRef.once("value", function(data) {
            userInfo = data.val();
        }, function() {
            if (typeof callback === 'function')
            callback(userInfo);
        });

};

var _setScore = function(todayScore) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var userInfo = _getUserInfo();
        // could optimize out vars, will do later, much more readable this way
        if (userInfo) {
            var localUserRef = usersRef.child(_auth.uid);
            var score = userInfo.score;
            var days = userInfo.days + 1;
            score += todayScore;
            localUserRef.push({running_score:todayScore});
            return localUserRef.update({
                "score": score,
                "days": days,
                "running_score": runningScore
            });
        }
};

var _getAverageScore = function() {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var userInfo = getUserInfo();
        if (userInfo) {
            return userInfo.score / userInfo.days;
        }
};

var _getWeeklyScore = function() {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var userInfo = getUserInfo();
        if (userInfo) {
            return userInfo.running_score.slice(Math.max(arr.length - 7, 0), 7);
        }
};

var _getMonthlyScore = function() {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        getUserInfo(function(userInfo) {
            if (userInfo) {
                return userInfo.running_score.slice(Math.max(arr.length - 31, 0), 31);
            }
        });
};

var _getAuthID = function(email){
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        // var localUserRef = u
};

var _addFriends = function(email) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        // test to figure out if duplicate friends?
        usermapRef.orderByChild("email").equalTo("josh.j.singer@gmail.com").limitToFirst(1).once('value', function (obj) {
            obj.forEach(function(friendObj) {
            {
                console.log("friendObj\n");
                console.log(friendObj + "\n");
                var name = friendObj.child("name").val();
                var email = friendObj.child("email").val();
                var friendAuthID = friendObj.child("uid").val();
                console.log("name: " + name + "\nemail: " + email + "\nfriendid:" + friendAuthID);
                console.log("ADD FRIENDS WAS QUERIED");
                var localUserRef = usersRef.child(_auth.uid);
                localUserRef.child("friends").push({
                    email: email,
                    name: name,
                    uid: friendAuthID
                }, function () {
                    console.log("friend added")
                });
            }});
        });
};

var _getListOfFriends = function() {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var listOfFriends = [];
        usersRef.child(auth.uid).orderByChild("friends").once('value', function(obj) {
            obj.forEach(function(friend) {
                console.log(friend);
                listOfFriends.push(friend.val());
            });
            console.log(listOfFriends);
        });
};

var api;

var _auth = _getAuthToken();

// });

    api = {
    /*
    Routes

    User:https://socialgoodmh.firebaseio.com/users/apappu


    JSON Example:

    {
        "score": 0,
        "days": 0,
        "running_score": [],
        "friends": []
    }

    auth

    If auth is ever null, you need to redirect to the login screen.
    The cases in which it would be null would be either authentication
    didn't work, or the auth token expired. Use the login function to
    get a new auth payload

    TODO: https://www.firebase.com/docs/web/guide/user-auth.html

    */

        checkAuthentication: _checkAuthentication,
        createUser: _createUser,
        setUpUser: _setUpUser,
        getUsername: _getUsername,
        getPassword: _getPassword,
        getFirstName: _getFirstName,
        storeAuthToken: _storeAuthToken,
        getAuthToken: _getAuthToken,
        login: _login,
        isThereData: _isThereData,
        getUserInfo: _getUserInfo,
        setScore: _setScore,
        getAverageScore: _getAverageScore,
        getWeeklyScore: _getWeeklyScore,
        getMonthlyScore: _getMonthlyScore,
        getAuthID: _getAuthID,
        addFriends: _addFriends,
        getListOfFriends: _getListOfFriends,
        auth: _auth

    /*
    createUser is a method that takes in a username and a password and returns
    a boolean value that returns true if everything went ok, and false if there
    was an error. You want to take this call and if it returns true to use the login
    function to get an authentication token.

    make sure you pass in login to the callback so the user doesn't have to relogin in

    TODO: Figure out what to do about storing auth tokens locally to ReactNative

    */


    // only call this once, it's called when a user is created

    // TODO: optimize so no isThereData/getuserinfo call because it uses too much internet

    // hefty call?

    // use this for adding friends: d

    };
    module.exports = api;


    /* TODO:  Need to have a call to look at the user_map and
    figure out if a friend exists, then it needs to add them to the list of
        friends of a person and the person they added, then write the security rule
        for reading friends
        then write the security rule to allow looking at another person's score

        make sure you do a query by child

        also write a getauth event to find out when auth expires, so that the auth
        var check for null works properly
        for letting a friend know, we will need to have some code that is executing when the app begins
        they look through users score and if they are the lowest, they let their friend with the highest score know
        we will use either react native for push notif or batch[a
    */

    // write a method for letting friends know that a person isn't doing well