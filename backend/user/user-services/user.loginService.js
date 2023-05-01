const db = require("../../config/database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* connectToDBAndAddMetaPropsForLogin() calls the establishDBConnection() of 
databse.js module to connect to the databse and then adds some meta properties 
required to 'metaObject' returned due to resolution of establishDBConnection().
These additional meta properties are required for the login action.
*/
const connectToDBAndAddMetaPropsForLogin = (user) => {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((metaObject) => {
        metaObject.user = user;
        metaObject.userExists = false;
        metaObject.errorMessage =
          "Error occurred while closing database connection during login process!";

        resolve(metaObject);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/* verifyCredentials() verify the user credentials by querying the database. If 
verification is successfull then the promise gets resolved else it gets rejected.
In both cases we send the 'metaObject' back to the invoking scope. And in the case 
when error occurs while querying the database, 'metaObject' is set to contain the 
appropriate 'statusCode' and 'message' info. */
const verifyCredentials = (res) => {
  return new Promise((resolve, reject) => {
    const connection = res.connection;
    const sql = "select * from users where emailId = ?";
    const user = res.user;
    //console.log(user);
    connection.query(sql, [user.email, user.password], function (err, result) {
      if (err) {
        console.log(
          "Error while issuing query to the database during the login process!"
        );
        console.log("Error message:", err.message);
        res.statusCode = 500;
        res.message = "Something went wrong in the server!";
        reject(res);
      } else {
        console.log(result);
        if (result.length === 1) {
          res.userExists = true;
          if (res.user.pwd === result[0].password) {
            res.userName = result[0].userName;
            res.statusCode = 200;
            res.message = "User verified successfully!";
            console.log(res.message);
          } else {
            res.statusCode = 401;
            res.message = "Incorrect password!";
            console.log(res.message);
            reject(res);
          }
        } else {
          res.statusCode = 401;
          res.message = "Incorrect email id!";
          console.log(res.message);
          reject(res);
        }
      }
      db.closeDBConnection(res.connection, res.errorMessage);
      resolve(res);
    });
  });
};

/* loginUser() is the first function to be called for login flow. It requires an 
'user' object as an argument which has this structure: 
{
    "userCredentials": {
        "email": "abc121@gmail.com",
        "pwd": "abc123",
        "userType": "user"
    }
}
If during the login flow some error occurs then the loginUser() catches that and then
passes an errorsResponse object during the promise rejection. The errorResponse has 
this structure:
{
    error: { statusCode: err.statusCode, message: err.message },
}
In case the login flow completes successfully then the loginUser() resolves the 
promise returned by it and passes a loggedInUser object during promise resolution.
The loggedInUser has this structure:
{
    userName: string,
    token: string,
    email: string
}
*/
const loginUser = (user) => {
  return new Promise((resolve, reject) => {
    connectToDBAndAddMetaPropsForLogin(user)
      .then((res) => {
        return verifyCredentials(res);
      })
      .then((res) => {
        if (res.userExists && res.statusCode == 200) {
          let payload = {
            userName: res.userName,
            isAdmin: user.userType === "admin" ? true : false,
            email: user.email,
            expirationDate: new Date(
              new Date().getTime() + process.env.tokenExpiresIn * 1000
            ),
          };
          let token = jwt.sign(payload, process.env.Secret_Key);
          let loggedInUser = {
            userName: res.userName,
            token: token,
            email: user.email,
          };
          resolve(loggedInUser);
        }
      })
      .catch((err) => {
        db.closeDBConnection(err.connection, err.errorMessage);
        let errorResponse = {
          error: { statusCode: err.statusCode, message: err.message },
        };
        reject(errorResponse);
      });
  });
};

exports.loginUser = loginUser;
