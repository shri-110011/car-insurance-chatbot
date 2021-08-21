var conn = require('./database-connectivity');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const getConnectionObject = (user) => {
    return new Promise((resolve, reject) => {
        var connection = conn.getConnection();
        var metaObject = {}
        metaObject.user = user;
        metaObject.connection = connection;
        metaObject.status = false;
        metaObject.userExists = false;
        connection.connect(function(err){
            if(err){
                console.log("Error while connecting to the database inside getConnectionObject!");
                resolve(metaObject);
                //throw err;
            }
            console.log("Connection established");
            metaObject.status = true
            resolve(metaObject)
        });
    })
}

const verifyCredentials = (res) => {
    return new Promise((resolve, reject) => {
        var connection = res.connection;
        if(res.status){
            var sql = "select * from Users where emailId = ?";
            var user = res.user
            //console.log(user);
            connection.query(sql, [user.email, user.password], function(err, result){
                if(err){
                    console.log("Error while connecting to the database inside insertUser!");
                    res.status = false;
                    resolve(res);
                    throw err;
                }
                else{
                    console.log(result);
                }
                console.log(result.length);
                if(result.length === 1){
                    res.userExists = true;
                    if(res.user.pwd === result[0].password){
                        res.status = true
                        res.userName = result[0].userName;
                    }
                    else{
                        res.status = false
                    }
                    // res.userName = result;
                }
                connection.end(function(err){
                    if(!err){
                        console.log("Connection closed!");
                        resolve(res);
                    }
                    else{
                        console.log("Error occurred while closing database connection inside insertUser!");
                        throw err;
                    }      
                });    
            })
        }
    })
}

const loginUser = (user) => {
    return new Promise((resolve, reject)=>{
        getConnectionObject(user)
        .then((res)=>{
            return verifyCredentials(res);
        })
        .then((res)=>{
            if(res.userExists) {
                console.log("User exists!");
                if(res.status){
                    console.log("Valid credentials!");
                    let payload = {userName: res.userName};
                    let token = jwt.sign(payload, process.env.Secret_Key);
                    loggedInUser= {userName: res.userName, token: token};
                    resolve(loggedInUser);
                }
                else{
                    console.log("Invalid Credentials!");
                    loggedInUser= {userName: "0"}
                    resolve(loggedInUser);
                }
            }
            else{
                console.log("User doesn't exist!");
                loggedInUser= {userName: "-1"};
                resolve(loggedInUser);
            }
        })
    })
}

exports.loginUser = loginUser;

// user = {email: "ashri9706@gmail.com",  password: "1234516" };

// loginUser(user)
// .then((res) =>{
//     if(res !== "")
//         console.log("Hurray user exists!")
//     else
//         console.log("User credentials are invalid!")
// })
// .catch(err => {
//     console.log("Something went wrong!");
// })