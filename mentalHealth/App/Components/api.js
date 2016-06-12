var React = require('react-native');
var Firebase = require("firebase");
var config = require("./config");
var API_URL = config.API_URL
var ref = new Firebase(API_URL);
var usermapRef = ref.child("user_map");

var usersRef = ref.child("users");

var {
    AsyncStorage,
    PushNotificationIOS
} = React;

var _checkAuthentication = function(){
        return _getUsername();
};

var _schedulePushNotification = function(text){
    var details = {
        fireDate: (new Date(Date.now() + (10 * 1000))).toISOString(),
        alertBody: text + " isn't doing so hot. You should check in on them!"
    }
    PushNotificationIOS.scheduleLocalNotification(details);
};

var _createUser = function(username, password, firstname, email, phoneNumber) {
        if (typeof username != "string" || typeof password != "string") {
                throw "Username and/or password isn't a string";
        }
        return ref.createUser({
            username: username,
            password : password,
            firstname: firstname,
            email    : email,
            phoneNumber: phoneNumber
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
                return false;
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                _auth = userData;
                return AsyncStorage.setItem("username", username).then((value) => {
                    return AsyncStorage.setItem("password", password).then(() => {
                        return AsyncStorage.setItem("firstname", firstname).then(() => {
                            return AsyncStorage.setItem("email", email).then(() => {
                               return  _storeAuthToken(userData.uid).then(() => {
                                    console.log("about to return login in createUser function");
                                    return _login(email, password, _setUpUser, firstname, email, phoneNumber);
                                })
                            })
                        })
                    })
                })

            }
        });
};

var _getAuthToken = function(){
    return AsyncStorage.getItem("authToken");
};

var _setUpUser = function(firstname, email, phoneNumber) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        // var localUserRef = usersRef.child(_auth.uid);
        // localUserRef.set({
        //     "score": 0,
        //     "days": 0,
        // }, function() {
        //     console.log("set up a user");
        // });
        // var user_map = ref.child("user_map");
        // user_map.push({
        //     name : firstname,
        //     uid : _auth.uid,
        //     email: email
        // });
        var localUserRef = usersRef.child(_auth.uid);
        return localUserRef.set({
            "score": 0,
            "days": 0,
            "running_score": 0,
            "name": firstname,
            "phoneNumber": phoneNumber
        }, function() {
            console.log("set up a user");
        }).then(() => {
            var user_map = ref.child("user_map");
            return user_map.push({
                name : firstname,
                uid : _auth.uid,
                email: email,
                phoneNumber: phoneNumber
            }).then(() => {
                console.log("about to return asyncstorage setitem promise");
                return AsyncStorage.setItem("setUpUserDone", "1");
            })
        })
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


var _login = function(username, password, callback, firstname, email, phoneNumber) {
        return ref.authWithPassword({
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
                        console.log("returning setupuser function");
                        return callback(firstname, email, phoneNumber);
                    }
                })
            }
        });
};

var _isThereData = function() {
        usersRef.on("value", function(snapshot) {
            console.log(snapshot.val);
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
        console.log("getuserinfo first");
        return _auth.then((uid) => {
            localUserRef = usersRef.child(uid);
            var userInfo = null;
            console.log("getuserinfo second");
            localUserRef.once("value", function(data) {
                userInfo = data.val();
                console.log(userInfo);
                return callback(userInfo);
            }, function(userInfo) {
                    console.log("getuserinfo third");
                    
                }  
            );
        })
        // localUserRef = usersRef.child(_auth.uid);
        // var userInfo = null;
        // localUserRef.once("value", function(data) {
        //     userInfo = data.val();
        // }, function() {
        //     if (typeof callback === 'function')
        //     callback(userInfo);
        // });

};

var _setScore = function(todayScore) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        return _getUserInfo(function(userInfo){
            if (userInfo) {
                console.log("we're hitting something");
                return _auth.then((uid) => {
                    console.log("this is uid");
                    console.log(uid);
                    var localUserRef = usersRef.child(uid);
                    var historyRef = usersRef.child(uid).child("history");
                    var score = userInfo.score;
                    var days = userInfo.days + 1;
                    score += todayScore;
                    historyRef.push({"todayScore":todayScore});
                    return localUserRef.update({
                        "score": score,
                        "days": days,
                        "running_score": score,
                        "name": userInfo.name,
                        "phoneNumber": userInfo.phoneNumber
                    }).catch((error) => {
                        console.log(error);
                    });
                })
            }
            else {
                console.log("shit ain't working");
            }
        });
        //var userInfo = 1;
        // could optimize out vars, will do later, much more readable this way
        // if (userInfo) {
        //     return _auth.then((uid) => {
        //         console.log("this is uid");
        //         console.log(uid);
        //         var localUserRef = usersRef.child(uid);
        //         var score = userInfo.score;
        //         var days = userInfo.days + 1;
        //         score += todayScore;
        //         localUserRef.push({running_score:todayScore});
        //         return localUserRef.update({
        //             "score": score,
        //             "days": days,
        //             "running_score": score
        //         });
        //     })

            // var localUserRef = usersRef.child(_auth.uid);
            // var score = userInfo.score;
            // var days = userInfo.days + 1;
            // score += todayScore;
            // localUserRef.push({running_score:todayScore});
            // return localUserRef.update({
            //     "score": score,
            //     "days": days,
            //     "running_score": runningScore
            // });
        //}
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
        return _auth.then((uid) => {
            var historyRef = usersRef.child(uid).child("history");
            return new Promise(function(resolve,reject){
                historyRef.limitToLast(7).orderByChild("todayScore").once("value", function(snapshot){
                    var total = 0;
                    for (var key in snapshot.val()) {
                        console.log("in weekly score");
                        console.log(snapshot.val()[key]["todayScore"]);
                        if(snapshot.val()[key]["todayScore"] != undefined) total += snapshot.val()[key]["todayScore"];
                    }
                    console.log("this is totaol");
                    console.log(total);
                    historyRef.update({
                        running_score: total
                    });
                    resolve(total);
                })
            })
            // return historyRef.limitToLast(7).once("value", function(snapshot) {
            //   console.log(snapshot.val());
            //     return new Promise(function(resolve, reject){
            //         resolve(snapshot.val());
            //     });
            // });
        });
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
};

var _addFriends = function(phoneNumber) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        console.log("phoneNumber " + phoneNumber);
        // test to figure out if duplicate friends?
        //.equalTo(phoneNumber).limitToFirst(1)
        return usersRef.orderByChild("name").once('value', function (obj) {
            console.log("add friends obj");
            var friendObj = obj;
            console.log(obj.val());
            // obj.forEach(function(friendObj) {
            // {
                console.log("friendObj\n");
                console.log(friendObj.val());
                var name = friendObj.child("name").val();
                var number = friendObj.child("phoneNumber").val();
                var email = friendObj.child("email").val();
                var friendAuthID = friendObj.child("uid").val();
                console.log("name: " + name + "\nnumber: " + number + "\nfriendid:" + friendAuthID);
                console.log("ADD FRIENDS WAS QUERIED");
                return _auth.then((uid) =>{
                    var localUserRef = usersRef.child(uid);
                    return localUserRef.child("friends").push({
                            "email": email,
                            "name": name,
                            "uid": friendAuthID,
                            "phoneNumber": phoneNumber
                        }, function () {
                            console.log("friend added")
                        });
                    })
            
        }, function(error) {
            console.log(error);
        });
};

var _asyncFriends = function requestAsyncFriends(phoneNumber){
    console.log("inn async friends");
        console.log("in promise");
        //.equalTo(phoneNumber).limitToFirst(1)
        return new Promise(function(resolve, reject){
            usersRef.orderByChild("phoneNumber").equalTo(phoneNumber).limitToFirst(1).once("value").then((snapshot) => {
                console.log("here");
                var userid = snapshot.val();
                console.log(userid);
                for(var key in userid){
                    var runningScore = userid[key]["running_score"];
                    var name = userid[key]["name"];
                }
                console.log("this is running score and name");
                console.log(runningScore);
                console.log(name);
                resolve([name, runningScore]);
                //var localUserRef = usersRef.child(userid.uid);
                console.log(userid);
                console.log(localUserRef);
                console.log("about to enter localUserRef");
            });
        });
         // usersRef.orderByChild("phoneNumber").equalTo(phoneNumber).limitToFirst(1).once("value").then((snapshot) => {
         //    console.log("here");
         //    var userid = snapshot.val();
         //    console.log(userid);
         //    for(var key in userid){
         //        var runningScore = userid[key]["running_score"];
         //    }
         //    console.log("this is running score");
         //    console.log(runningScore);
         //    //var localUserRef = usersRef.child(userid.uid);
         //    console.log(userid);
         //    console.log(localUserRef);
         //    console.log("about to enter localUserRef");
            // return localUserRef.once("value").then((data) =>{
            //     var friendObj = data.val();
            //     var minScore = friendObj.val().running_score;
            //     var sadFriend = friendObj.val().name;
            //     console.log("this is sad friend");
            //     console.log(sadFriend);
            // })
            //  function(data) {
            //     var friendObj = data.val();
            //     var minScore = friendObj.val().running_score;
            //     var sadFriend = friendObj.val().name;
            //     console.log("this is sad friend");
            //     console.log(sadFriend);
            //     //resolve([sadFriend, minScore]);
            // });
         // }); {
         //    var userid = snapshot.val();
         //    var localUserRef = usersRef.child(userid);
         //    console.log(userid);
         //    console.log(localUserRef);
         //    console.log("about to enter localUserRef");
         //    return localUserRef.once("value", function(data) {
         //        var friendObj = data.val();
         //        var minScore = friendObj.val().running_score;
         //        var sadFriend = friendObj.val().name;
         //        console.log("this is sad friend");
         //        console.log(sadFriend);
         //        //resolve([sadFriend, minScore]);
         //    });
         //    // call get user info
         //    // extract running score
         // }, function(err){
         //    console.log("it didn't work");
         //    console.log(err);
         // });
        //  friendRef.once('value', function(friendObj) {
        //     console.log("this is friendObj Score:");
        //     console.log(friendObj.val());
        //     var minScore = friendObj.val().running_score;
        //     var sadFriend = friendObj.val().name;
        //     console.log("this is sad friend");
        //     console.log(sadFriend);
        //     resolve([sadFriend, minScore]);
        // }, function(err) {
        //     console.log("didn't work");
        //     console.log(err);
        // });
    //});
    console.log("hit end of func before promise");
}
var _getListOfFriends = function(currUserTotal, callback) {
        if (_auth == null) {
            console.log("Isn't logged in");
            return false;
        }
        var minScore = Number.MAX_SAFE_INTEGER;
        var sadFriend = null;
        console.log("in list of friends func");
        return _auth.then((uid) => {
            console.log("in auth func");
            return usersRef.child(uid).orderByChild("friends").once('value', function(obj) {
                console.log("in usersRef Auth");
                var userObj = obj.val();
                var asyncArray = [];
                var friendRef = null;
                console.log(obj.val());
                console.log(userObj["friends"]);
                for (var key in userObj.friends){
                    friendRef = null;
                    console.log("in loop. ");
                    var phoneNumber = userObj["friends"][key]["phoneNumber"];
                    //console.log(friendUid);
                    // if(phoneNumber != undefined) friendRef = usersRef.child(friendUid);
                    console.log(userObj["friends"][key]["phoneNumber"]);
                    //console.log(friendRef);
                    if(phoneNumber !== undefined) asyncArray.push(_asyncFriends(phoneNumber));
                    console.log(asyncArray);
                }
                console.log("about to enter promise all call");
                console.log(asyncArray);
                // Promise.all(asyncArray).then((values) => {
                //     console.log("in promise all call");
                //     console.log(values);
                //     sadFriend = values[0];
                //     values.forEach(function(value){
                //         console.log("value");
                //         console.log(value);
                //     });
                // });
                    console.log("hit top of new promise");
                return Promise.all(asyncArray).then(function(values){
                        console.log(asyncArray);
                        var minScore = Number.MAX_SAFE_INTEGER;
                        var sadFriendName = null;
                        values.forEach(function(value){
                            if (value[1] <= minScore) {
                                sadFriendName = value[0];
                                minScore = value[1];
                            }
                        });
                        console.log(sadFriendName + " is sad :(");
                        callback(sadFriendName);
                        _sadFriend = sadFriendName;
                });
                //return Promise.all(asyncArray);
            });
        });
};

var _getHighestFriend = function(){
    _getListOfFriends().then((friendArray) => {
         
    })
}

var _updateAuthToken = function(){
    _auth = _getAuthToken();

}

var api;

var _auth = _getAuthToken();

var _sadFriend = null;

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
        auth: _auth,
        schedulePushNotification: _schedulePushNotification,
        updateAuthToken: _updateAuthToken,
        sadFriend: _sadFriend

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