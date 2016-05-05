var Firebase = require("firebase");

var ref = new Firebase("https://socialgoodmh.firebaseio.com/");

var usersRef = ref.child("users");

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
    if (login(username, password)) {
        setUpUser();
    }
}

function setUpUser() {
    if (auth == null) {
        console.log("Isn't logged in");
        return false;
    }
    var localUserRef = usersRef.child(auth.uid);
    localUserRef.set({
        "score": 0,
        "days": 0,
        "running_score": [],
        "friends": []
    });
    var user_map = ref.child("user_map");
    user_map.push({
        email : auth.uid
    });
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

// use this for adding friends: d
function addFriends(friendsArr) {

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
    we will use either react native for push notif or batch[
*/

// write a method for letting friends know that a person isn't doing well