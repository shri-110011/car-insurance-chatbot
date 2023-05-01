var db = require("../../config/database");

const connectToDBAndAddMetaPropsForInsuranceApply = (insuranceDetails) => {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((metaObject) => {
        metaObject.insuranceDetails = insuranceDetails;
        metaObject.duplicateLicensePlateNumber = false;
        metaObject.errorMessage = "Error occurred while closing database connection during car insurance application process!";
        resolve(metaObject);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const applyCarInsurance = (res) => {
  return new Promise((resolve, reject) => {
    const connection = res.connection;
    const sql = `insert into customers(aadhaarNo, 
                        customerName, 
                        carModel, 
                        licensePlateNo,
                        insurancePlan,
                        insuranceAppliedDate,
                        street,
                        city,
                        pincode,
                        state,
                        country,
                        phone,
                        email
                    ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);select last_insert_id() as insuranceId;`;

    connection.query(
      sql,
      [
        res.insuranceDetails.aadhaarNo,
        res.insuranceDetails.customerName,
        res.insuranceDetails.carModel,
        res.insuranceDetails.licensePlateNo,
        res.insuranceDetails.insurancePlan,
        res.insuranceDetails.insuranceAppliedDate,
        res.insuranceDetails.address.street,
        res.insuranceDetails.address.city,
        res.insuranceDetails.address.pincode,
        res.insuranceDetails.address.state,
        res.insuranceDetails.address.country,
        res.insuranceDetails.phone,
        res.insuranceDetails.email,
      ],
      (err, resultSet) => {
        if (err) {
          console.log(
            "Error while issuing query to the database to insert the car insurance application details!"
          );
          console.log("Error message:", err.message);
          res.statusCode = 500;
          res.message = "Something went wrong in the server!";
          reject(res);
        } else {
          console.log(resultSet);
          // console.log(resultSet[1][0]);
          res.insuranceId = resultSet[1][0].insuranceId;
          res.statusCode = 200;
          res.message = "Car insurance application processed successfully!";
          console.log("Car insurance application processed successfully!");

          db.closeDBConnection(res.connection, res.errorMessage);
          resolve(res);
        }
      }
    );
  });
};

const isDuplicateLicensePlateNumber = (res) => {
  return new Promise((resolve, reject) => {
    const connection = res.connection;
    const sql = "select licensePlateNo from customers where licensePlateNo = ?";
    const licensePlateNumber = res.insuranceDetails.licensePlateNo;
    connection.query(sql, [licensePlateNumber], function (err, result) {
      if (err) {
        console.log(
          "Error while issuing query to the database for checking car license plate number uniqueness during the insurance apply process!"
        );
        console.log("Error message:", err.message);
        res.statusCode = 500;
        res.message = "Something went wrong in the server!";
        reject(res);
      } else {
        console.log("Checking uniqueness of license plate number...");
        console.log(result);
        if (result.length !== 0) {
          console.log("Duplicate license plate number!");
          res.duplicateLicensePlateNumber = true;
          res.statusCode = 400;
          res.errorCode = "DUP_LIC_PLATE_NO";
          res.message = `License Plate Number '${licensePlateNumber}' already exists!`;
          reject(res);
        }
        resolve(res);
      }
    });
  });
};

const apply = (insuranceDetails) => {
  return new Promise((resolve, reject) => {
    connectToDBAndAddMetaPropsForInsuranceApply(insuranceDetails)
      .then((res) => {
        return isDuplicateLicensePlateNumber(res);
      })
      .then((res) => {
        return applyCarInsurance(res);
      })
      .then((res) => {
        if (res.statusCode === 200 && !res.duplicateLicensePlateNumber) {
          let successResponse = {
            statusCode: res.statusCode,
            message: res.message,
            insuranceId: res.insuranceId,
          };
          resolve(successResponse);
        }
      })
      .catch((err) => {
        db.closeDBConnection(err.connection, err.errorMessage);
        let errorResponse = {
          error: { statusCode: err.statusCode, message: err.message },
        };
        if (err.errorCode) {
          errorResponse.error.errorCode = err.errorCode;
        }
        reject(errorResponse);
      });
  });
};

exports.apply = apply;

// {
//   "aadhaarNo": 100000000001,
//   "customerName": "A.Shrikant",
//   "carModel": "Honda Amaze",
//   "licensePlateNo": "ABC128",
//   "insurancePlan": "third-party",
//   "address": {
//       "street": "A/101, Circular Road",
//       "city": "Delhi",
//       "pincode": 110010,
//       "state": "Delhi",
//       "country": "India"
//   },
//   "phone": 9292929291,
//   "email": "abc121@gmail.com"
// }
