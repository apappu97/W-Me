var React = require('react-native');
var Firebase = require("firebase");

var ref = new Firebase("https://socialgoodmh.firebaseio.com/");

var usermapRef = ref.child("user_map");
var usersRef = ref.child("users");


var {
    AsyncStorage
} = React;

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


var auth = null;



console.log(createUser("apappu@stanford.edu", "socialgood", "Aneesh"));


/*
createUser is a method that takes in a username and a password and returns
a boolean value that returns true if everything went ok, and false if there
was an error. You want to take this call and if it returns true to use the login
function to get an authentication token.

make sure you pass in login to the callback so the user doesn't have to relogin in

TODO: Figure out what to do about storing auth tokens locally to ReactNative

*/


function createUser(username, password, firstname) {
    if (typeof username != "string" || typeof password != "string") {
            throw "Username and/or password isn't a string";
    }
    ref.createUser({
        email    : username,
        password : password
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            return false;
        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            auth = userData;
            AsyncStorage.setItem("username", username).then((value) => {
                AsyncStorage.setItem("password", password).then(() => {
                    // credentials updated, login now
                    login(username, password, setUpUser(firstname, username));
                })
            })

        }
    });
}

// only call this once, it's called when a user is created
function setUpUser(firstname, email) {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var localUserRef = usersRef.child(auth.uid);
    localUserRef.set({
        "score": 0,
        "days": 0,
    }, function() {
        console.log("set up a user");
    });
    var user_map = ref.child("user_map");
    user_map.push({
        name : firstname,
        uid : auth.uid,
        email: email
    });
}

function getUsername(){
    AsyncStorage.getItem("username").then((value) => {
        return value;
    })
}

function getPassword(){
    AsyncStorage.getItem("password").then((value) => {
        return value;
    })
}

function login(username, password, callback) {
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
            auth = authData;
            if (typeof callback === "function") {
                callback();
            }
        }
    });
}

function isThereData() {
    usersRef.on("value", function(snapshot) {
        console.log(snapshot.val());
        return true;
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        return false;
    });
}


// TODO: optimize so no isThereData/getuserinfo call because it uses too much internet

// hefty call?

function getUserInfo(callback) {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    localUserRef = usersRef.child(auth.uid);
    var userInfo = null;
    localUserRef.once("value", function(data) {
        userInfo = data.val();
    }, function() {
        if (typeof callback === 'function')
        callback(userInfo);
    });

}

function setScore(todayScore) {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var userInfo = getUserInfo();
    // could optimize out vars, will do later, much more readable this way
    if (userInfo) {
        var localUserRef = usersRef.child(auth.uid);
        var score = userInfo.score;
        var days = userInfo.days + 1;
        score += todayScore;
        localUserRef.push({running_score:todayScore});
        localUserRef.update({
            "score": score,
            "days": days,
            "running_score": runningScore
        });
    }

}

function getAverageScore() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.score / userInfo.days;
    }
}

function getAverageScore() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.score / userInfo.days;
    }
}

function getWeeklyScore() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.running_score.slice(Math.max(arr.length - 7, 0), 7);
    }
}

function getMonthlyScore() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    getUserInfo(function(userInfo) {
        if (userInfo) {
            return userInfo.running_score.slice(Math.max(arr.length - 31, 0), 31);
        }
    });
}

function getAuthID(email) {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    // var localUserRef = u
}

// use this for adding friends: d
function addFriends(email) {
    if (auth == null) {
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
            var localUserRef = usersRef.child(auth.uid);
            localUserRef.child("friends").push({
                email: email,
                name: name,
                uid: friendAuthID
            }, function () {
                console.log("friend added")
            });
        }});
    });
}

function getListOfFriends() {
    if (auth == null) {
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
}

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