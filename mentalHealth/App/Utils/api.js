var Firebase = require("firebase");

var ref = new Firebase("https://socialgoodmh.firebaseio.com/");

var usersRef = ref.child("users");

/*
Routes

User:https://socialgoodmh.firebaseio.com/users/apappu


JSON Example:

{
    "total_score": 0,
    "number_of_days": 0,
    "running_score": [],
    "friends": []
}
 
*/


/*

auth

If auth is ever null, you need to redirect to the login screen.
The cases in which it would be null would be either authentication
didn't work, or the auth token expired. Use the login function to
get a new auth payload

TODO: https://www.firebase.com/docs/web/guide/user-auth.html

*/


var auth = null;


/*
createUser is a method that takes in a username and a password and returns
a boolean value that returns true if everything went ok, and false if there
was an error. You want to take this call and if it returns true to use the login
function to get an authentication token.

make sure you pass in login to the callback so the user doesn't have to relogin in

TODO: Figure out what to do about storing auth tokens locally to ReactNative

*/


function createUser(username, password, firstname, login) {
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
            return true;
        }
    });
    login(username, password);
    // set the user with some 0'ed out data
}

function login(username, password) {
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
            return true;
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

function getUserInfo() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    localUserRef = usersRef.child(auth.uid);
    var userInfo = null;
    localUserRef.once("value", function(data) {
        userInfo = data;
    });
    return userInfo;
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
        var runningScore = userInfo.running_score.val();
        score += todayScore;
        runningScore.push(todayScore);
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
    "use strict";
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
    "use strict";
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var userInfo = getUserInfo();
    if (userInfo) {
        return userInfo.running_score.slice(Math.max(arr.length - 31, 0), 31);
    }
}

// use this for adding friends: https://stackoverflow.com/questions/17433578/protected-content-in-firebase-possible
function addFriends(friendsArr) {

}

// write a method for letting friends know that a person isn't doing well




