const userLoginService = require('./user-services/user.loginService');
const userRegisterService = require('./user-services/user.registerService');
const jwt = require('jsonwebtoken');
var cookie = require('cookie');

exports.user_login = (req, res)=> {
    // res.send("qwerty");
    console.log("Inside user_login");
    console.log("req.body :");
    console.log(req.body.userCredentials);
    // console.log("#");
    isAdmin = false;
    if(req.body.userCredentials["userType"] === "admin"){
        if(req.body.userCredentials["email"] !== process.env.Admin_User){
            loggedInUser = {userName: '-1', isAdmin: isAdmin};
            res.send({loggedInUser: loggedInUser});
        }
        else
            isAdmin = true;
    }
    if(req.body.userCredentials["userType"] !== "admin" || isAdmin){
        userLoginService.loginUser(req.body.userCredentials)
        .then(data => {
            // res.send({msg: userName});
            if(data.userName !== '-1' && data.userName !== '0'){
                let token =  cookie.serialize( 'token', data.token, 
                {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                    maxAge: process.env.tokenExpiresIn // expiresIn is in seconds
                });
                res.setHeader('Set-Cookie', token);
            }
            // console.log(data.token);

            loggedInUser["isAdmin"] = isAdmin;
            loggedInUser["expiresIn"] = process.env.tokenExpiresIn;

            console.log(loggedInUser);

            res.send({loggedInUser: loggedInUser});
        })
    }
}

exports.user_logout = (req, res)=> {

    console.log("-----------------------Logout Successful");
    // console.log(req.body);
    res.clearCookie('token');
    res.send({logoutStatus: true});
}

exports.user_token = (req, res)=> {
    console.log("Inside /token");
    // console.log(req.body.userDataFromToken.expiresIn);
    res.send({tokenValidity: true, userName: req.body.userDataFromToken.userName, isAdmin: req.body.userDataFromToken.isAdmin, email: req.body.userDataFromToken.email, expiresIn: req.body.userDataFromToken.expiresIn});
}

exports.authenticate_token = (req, res, next)=> {
    console.log("Authenticating Token")
    //console.log("req.body: "+req.body)
    //console.log("req.user: "+req.user)
    console.log("req.body :");
    console.log(req.body);
    var cookiesRecieved = cookie.parse(req.headers.cookie || "");
    console.log("Cookie Received:");
    console.log(cookiesRecieved);
    if(cookiesRecieved.token !== undefined ){
        const token = cookiesRecieved.token;
        // console.log("Token is not undefined");
        if(token == null) 
            res.sendStatus(401)
        else{
            // console.log("Token: "+token);
            jwt.verify(token, process.env.Secret_Key, (err, user)=>{
                if(err) {
                    console.log("Error###############################")
                    return res.status(403).send({tokenValidity: false});
                }
                console.log(user);
                if(req.body.loggedInUser){
                    // console.log(req.body.loggedInUser);
                    if(req.body.loggedInUser.userName === user.userName){
                        console.log(user.userName);
                    }
                }
                // console.log(req.body.loggedInUser.userName);
                req.body.userDataFromToken = {};
                req.body.userDataFromToken.email = user.email;
                req.body.userDataFromToken.userName = user.userName;
                req.body.userDataFromToken.isAdmin = user.isAdmin;
                console.log(user.expirationDate);
                let expiresIn = (new Date(user.expirationDate)-new Date())/1000;
                console.log("--------------");
                console.log(expiresIn);
                console.log("--------------");
                req.body.userDataFromToken.expiresIn = expiresIn;
                next()
            });
        }
    }
    else {
        // console.log("cookiesRecieved.token is undefined");
        return res.send({tokenValidity: false});
    }
}

exports.user_register = (req, res)=> {
    console.log(req.body);
    userRegisterService.registerUser(req.body.userData)
    .then((result) => {
        if(result)
            res.send({msg: "Registration Successful!"});
        else
        res.send({msg: ""});
    })
}