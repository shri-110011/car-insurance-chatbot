const db = require("../../config/database");

const connectToDBAndAddMetaPropsForSignup = (user) => {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((metaObject) => {
        metaObject.user = user;
        metaObject.duplicateEmail = false;
        metaObject.errorMessage =
          "Error occurred while closing database connection during signup process!";
        resolve(metaObject);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/* insertUser() inserts the res.user object into the database. */
const insertUser = (res) => {
  return new Promise((resolve, reject) => {
    const connection = res.connection;
    const sql =
      "insert into users(emailId, userName, password) values (?, ?, ?)";
    const user = res.user;
    // console.log(user);
    connection.query(
      sql,
      [user.email, user.name, user.password],
      function (err, result) {
        if (err) {
          console.log(
            "Error while issuing query to the database to insert new user during the signup process!"
          );
          console.log("Error message:", err.message);
          res.statusCode = 500;
          res.message = "Something went wrong in the server!";
          reject(res);
        } else {
          res.statusCode = 200;
          res.message = "New user inserted successfully!";
          console.log("New user inserted successfully!");
          db.closeDBConnection(res.connection, res.errorMessage);
          resolve(res);
        }
      }
    );
  });
};

/* checkEmailUniqueness() checks for the email uniqueness of the provided email
stored in the res.user object. */
const checkEmailUniqueness = (res) => {
  return new Promise((resolve, reject) => {
    const connection = res.connection;
    const sql = "select * from users where EmailId = ? ";
    const email = res.user.email;
    connection.query(sql, [email], (err, result) => {
      if (err) {
        console.log(
          "Error while issuing query to the database for checking email uniqueness during the signup process!"
        );
        console.log("Error message:", err.message);
        res.statusCode = 500;
        res.message = "Something went wrong in the server!";
        reject(res);
      }

      if (result.length > 0) {
        console.log("Already registered user details!");
        console.log(result);
        res.duplicateEmail = true;
        res.statusCode = 400;
        res.message = `Email id '${email}' already exists!`;
        reject(res);
      }
      resolve(res);
    });
  });
};

/* registerUser() is the entry function for the new user registration flow. 
In case the registration is successful the registerUser() resolves the promise by
passing successResponse object.
successResponse has this structure:
{statusCode: number, message: string}
 */
const registerUser = (user) => {
  return new Promise((resolve, reject) => {
    connectToDBAndAddMetaPropsForSignup(user)
      .then((res) => {
        return checkEmailUniqueness(res);
      })
      .then((res) => {
        return insertUser(res);
      })
      .then((res) => {
        if (res.statusCode === 200 && res.duplicateEmail === false) {
          let successResponse = {
            statusCode: res.statusCode,
            message: res.message,
          };
          resolve(successResponse);
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

exports.registerUser = registerUser;
