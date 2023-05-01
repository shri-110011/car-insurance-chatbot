const userLoginService = require('./user-services/user.loginService');
const userRegisterService = require('./user-services/user.registerService');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// 'user_login' is the controller for login action.
exports.user_login = (req, res)=> {
    let isAdmin = false;

    /* In case the use logs in as an admin we checks his/her email against the
    admin email stored in .env file. If this check fails then we send an error 
    response.  */
    if(req.body.userCredentials["userType"] === "admin"){
        if(req.body.userCredentials["email"] !== process.env.Admin_User){
            res.status(403).send({error:{statusCode: 403, message: "Incorrect email id!"}});
        }
        else
            isAdmin = true;
    }
    if(req.body.userCredentials["userType"] !== "admin" || isAdmin){
        userLoginService.loginUser(req.body.userCredentials)
        .then(data => {
            if(data.userName !== '-1' && data.userName !== '0'){
                let token =  cookie.serialize( 'token', data.token, 
                {
                    path: "/",
                    httpOnly: true,
                    secure: false,
                    maxAge: +process.env.tokenExpiresIn // expiresIn is in seconds
                });
                // Setting the cookie 'token' at the client side.
                res.setHeader('Set-Cookie', token);
            }
            
            loggedInUser = {userName: data.userName, email: data.email, expiresIn: +process.env.tokenExpiresIn, isAdmin: isAdmin};
            console.log("loggedInUser: ", loggedInUser);
            res.send({loggedInUser: loggedInUser});
        })
        .catch(err => {
            console.log("Error occurred while login!");
            res.status(err.error.statusCode).send(err);
        })
    }
}

exports.user_logout = (req, res)=> {

    console.log("-----------------------Logout Successful");
    res.clearCookie('token');
    res.send({logoutStatus: true});
}

/* 'user_token' is the controller for returning the logged in user details back to 
the client on page refresh. So that the logged in state of the user is maintained in
the front-end app. The logged in user details are fetched from the cookie 'token' 
sent by the client. */
exports.user_token = (req, res)=> {
    console.log("Inside /token");
    // console.log(req.body.userDataFromToken.expiresIn);
    res.send({userName: req.body.userDataFromToken.userName, isAdmin: req.body.userDataFromToken.isAdmin, email: req.body.userDataFromToken.email, expiresIn: req.body.userDataFromToken.expiresIn});
}

/* 'authenticate_token' is the controller for authenticating the 'token' cookie. 
 */
exports.authenticate_token = (req, res, next)=> {
    console.log("Authenticating Token")
    console.log("req.body: ", req.body);
    var cookiesRecieved = cookie.parse(req.headers.cookie || "");
    console.log("Cookie Received:", cookiesRecieved);
    if(cookiesRecieved.token !== undefined ){
        const token = cookiesRecieved.token;
        jwt.verify(token, process.env.Secret_Key, (err, user)=>{
            if(err) {
                console.log("Error while verifying the token value!");
                return res.status(401).send({statusCode: 401, message: "Invalid cookie 'token'!"});
            }
            console.log("Information stored in token: ", user);

            req.body.userDataFromToken = {};
            req.body.userDataFromToken.email = user.email;
            req.body.userDataFromToken.userName = user.userName;
            req.body.userDataFromToken.isAdmin = user.isAdmin;
            let expiresIn = (new Date(user.expirationDate)-new Date())/1000;
            req.body.userDataFromToken.expiresIn = expiresIn;
            console.log("userDataFromToken: ", req.body.userDataFromToken);
            next();
        });
    }
    else {
        return res.status(204).send();
    }
}

/* 'user_register' is the controller for signing up new users. */
exports.user_register = (req, res)=> {
    userRegisterService.registerUser(req.body.userData)
    .then((result) => {
        res.send(result);
    })
    .catch(err => {
        console.log("Error occurred while signup!");
        res.status(err.error.statusCode).send(err);
    });
}