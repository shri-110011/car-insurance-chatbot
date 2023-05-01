var db = require("../../config/database");

const getCarInsuranceDetails = () => {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((res) => {
        res.errorMessage = "Error occurred while closing database connection after fetching car insurance details!";

        const sql =
          "select insurancePlan, count(*) insuranceCount from customers group by insurancePlan;";
        const connection = res.connection;
        connection.query(sql, (err, resultSet) => {
          if (err) {
            console.log(
              "Error while issuing query to the database to get the car insurance details!"
            );
            console.log("Error message:", err.message);
            res.statusCode = 500;
            res.message = "Something went wrong in the server!";
            reject(res);
          } else {
            console.log("Car insurance details:");
            console.log(resultSet);
            db.closeDBConnection(res.connection, res.errorMessage);
            resolve(resultSet);
          }
        });
      })
      .catch((err) => {
        db.closeDBConnection(err.connection, err.errorMessage);
        reject(err);
      });
  });
};

const userCarInsuranceDetails = (userDataFromToken) => {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((res) => {
        res.errorMessage = "Error occurred while closing database connection after fetching user car insurance details!";

        const sql = "select * from customers where email = ?";
        const connection = res.connection;
        connection.query(sql, [userDataFromToken.email], (err, resultSet) => {
          if (err) {
            console.log(
              "Error while issuing query to the database to get the user's car insurance details!"
            );
            console.log("Error message:", err.message);
            res.statusCode = 500;
            res.message = "Something went wrong in the server!";
            reject(res);
          } else {
            console.log("User's car insurance details:");
            console.log(resultSet);
            resolve(resultSet);
            db.closeDBConnection(res.connection, res.errorMessage);
          }
        });
      })
      .catch((err) => {
        db.closeDBConnection(err.connection, err.errorMessage);
        reject(err);
      });
  });
};

exports.userCarInsuranceDetails = userCarInsuranceDetails;
exports.getCarInsuranceDetails = getCarInsuranceDetails;
