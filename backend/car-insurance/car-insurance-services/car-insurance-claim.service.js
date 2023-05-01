var db = require('../../config/database');

const connectToDBAndAddMetaPropsForInsuranceClaim = (userData)=> {
    return new Promise((resolve, reject)=> {
        db.establishDBConnection()
        .then((metaObject) => {
            metaObject.userData = userData;
            metaObject.isInsuranceAlreadyClaimed = false;
            metaObject.isThereInsuranceIdEmailClash = false;
            metaObject.isInsuranceIdValid = true;
            metaObject.errorMessage = "Error occurred while closing database connection during car insurance claiming process!";
            resolve(metaObject);
        })
        .catch((err) => {
            reject(err);
        });
    });
}

const checkForInsuranceIdAndClaimStatus = (res)=> {
    return new Promise((resolve, reject)=> {
        const connection = res.connection;
        const sql = "select email, claimStatus from customers where insuranceId = ?;";
        connection.query(sql, [res.userData.claimData.insuranceId], (err, resultSet)=>{
            if(err){
                console.log(
                    "Error while issuing query to the database to check insurance id and claim status!"
                  );
                console.log("Error message:", err.message);
                res.statusCode = 500;
                res.message = "Something went wrong in the server!";
                reject(res);
            }
            else{
                console.log(resultSet);
                if(resultSet.length === 0){
                    res.isInsuranceIdValid = false;
                    res.statusCode = 400;
                    res.errorCode = "INVALID_CAR_INSURANCE_ID";
                    res.message = "Invalid insurance id!";
                    console.log("Invalid insurance id!");
                    reject(res);
                }
                else{
                    console.log("Flag 1");
                    if(resultSet[0].email !== res.userData.userDataFromToken.email){
                        res.isThereInsuranceIdEmailClash = true;
                        res.statusCode = 403;
                        res.errorCode = "EMAIL_ID_MISMATCH";
                        res.message = "Provided insurance id is not linked to your account!";
                        console.log("Provided insurance id is not linked to your account!");
                        reject(res);
                    }
                    else if(resultSet[0].claimStatus === "Claimed"){
                        res.isInsuranceAlreadyClaimed = true;
                        res.statusCode = 400;
                        res.errorCode = "CAR_INSURANCE_CLAIMED_ALREADY";
                        res.message = "Insurance has already been claimed!";
                        console.log("Insurance has already been claimed!");
                        reject(res);
                    }
                    else {
                        resolve(res);
                    }
                }
            }
        });
    });
}

const claimCarInsurance = (res)=> {
    return new Promise((resolve, reject)=> {
        const connection = res.connection;
        const sql = `update customers set claimStatus = ?, 
        insuranceClaimedDate = ? where insuranceId = ?;`;
        connection.query(sql, ["Claimed",  
            res.userData.claimData.claimDate,
            res.userData.claimData.insuranceId,], 
            (err, resultSet)=>{
            if(err){
                console.log(
                    "Error while issuing query to the database to update the claim status!"
                  );
                console.log("Error message:", err.message);
                res.statusCode = 500;
                res.message = "Something went wrong in the server!";
                reject(res);
            }
            else{
                // console.log(resultSet);
                // if(resultSet.affectedRows !== 1){
                //     res.status = false;
                // }
                res.statusCode = 200;
                res.message = "Car insurance claimed successfully!";
                console.log("Car insurance claimed successfully!");
                resolve(res);
            }
        });
        db.closeDBConnection(res.connection, res.errorMessage);
        console.log("**", res);
    });
}

const claim = (userData)=>{
    return new Promise((resolve, reject)=>{
        connectToDBAndAddMetaPropsForInsuranceClaim(userData)
        .then((res)=> {return checkForInsuranceIdAndClaimStatus(res)})
        .then((res)=> {return claimCarInsurance(res)})
        .then((res)=> {
            console.log("isInsuranceIdValid "+ res.isInsuranceIdValid);
            console.log("isThereInsuranceIdEmailClash "+res.isThereInsuranceIdEmailClash);
            console.log("isInsuranceAlreadyClaimed "+res.isInsuranceAlreadyClaimed);
            let successResponse = {
                statusCode: res.statusCode,
                message: res.message,
                insuranceId: res.userData.claimData.insuranceId
            };
            console.log(successResponse);
            resolve(successResponse);
        })
        .catch(err => {
            db.closeDBConnection(err.connection, err.errorMessage);
            let errorResponse = {
            error: { statusCode: err.statusCode, message: err.message,  insuranceId: err.userData.claimData.insuranceId },
            };
            if (err.errorCode) {
            errorResponse.error.errorCode = err.errorCode;
            }
            reject(errorResponse);
        })
    });
}

exports.claim = claim;

// {
//     "claimData": {
//         "insuranceId": "1000007",
//         "claimDate": "2023-04-29 14:03:53"
//     }
// }