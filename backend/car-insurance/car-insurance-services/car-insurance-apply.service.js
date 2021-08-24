var conn = require('../../config/database');

const getConnectionObject = (insuranceDetails)=> {
    return new Promise((resolve, reject)=> {
        var connection = conn.getConnection();
        var metaObject = {};
        metaObject.insuranceDetails = insuranceDetails;
        metaObject.connection = connection;
        metaObject.status = false;
        metaObject.duplicateLicensePlateNumber = false;
        connection.connect((err)=> {
            if(err){
                console.log("Error while connecting to the database inside getConnectionObject!");
                resolve(metaObject);
                throw err;
            }
            console.log("Connection established!");
            metaObject.status = true;
            resolve(metaObject);
        });
    });
}

const applyCarInsurance = (res)=> {
    return new Promise((resolve, reject)=> {
        var connection = res.connection;
        if(res.status){
            console.log(res.insuranceDetails);
            var sql = `insert into customers(aadhaarNo, 
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
            connection.query(sql, [
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
                                    ], (err, resultSet)=> {
                                        if(err){
                                            console.log("Error while connecting to the database inside applyCarInsurance!");
                                            res.status = false;
                                            resolve(res);
                                            throw err;
                                        }
                                        else{
                                            // console.log(resultSet);
                                            console.log(resultSet[1][0]);
                                            res.insuranceId = resultSet[1][0].insuranceId;
                                            connection.end(function(err){
                                                if(!err){
                                                    console.log("Connection closed!");
                                                    //console.log(resultSet);
                                                    resolve(res);
                                                }
                                                else{
                                                    console.log("Error occurred while closing database connection inside applyCarInsurancer!");
                                                    res.status = false;
                                                    resolve(res);
                                                }      
                                            });    
                                        }
                                    })
        }
        else{
            connection.end((err)=> {
                if(!err){
                    console.log("Connection closed!");
                }
                else{
                    console.log("Error occurred while closing database connection inside applyCarInsurance!");
                }
                console.log("res.status evaluated to false inside applyCarInsurance!");
                res.status = false;
                resolve(res);
            });
        }
    });
   
}

const isDuplicateLicensePlateNumber = (res)=> {
    return new Promise((resolve, reject)=> {
        if(res.status){
            console.log("Inside isDuplicateLicensePlateNumber");
            var connection = res.connection;
            var sql = "select licensePlateNo from customers where licensePlateNo = ?";
            var licensePlateNumber = res.insuranceDetails.licensePlateNo;
            connection.query(sql, [licensePlateNumber], function(err, result){
                if(err){
                    res.status = false;
                    resolve(res);
                    throw err;
                }
                else{
                    console.log(result);
                    if(result.length !== 0){
                        res.status = false;
                        res.duplicateLicensePlateNumber = true;
                    }
                    console.log(res.duplicateLicensePlateNumber);
                    resolve(res);
                }
            });
        }
        else{
            resolve(res);
            console.log("res.status evaluated to false inside isDuplicateLicensePlateNumber!");
        }
    });
}

const apply = (insuranceDetails)=> {
    return new Promise((resolve, reject)=> {
        getConnectionObject(insuranceDetails)
        .then((res)=> { return isDuplicateLicensePlateNumber(res)})
        .catch((err)=> console.log(err))
        .then((res)=> { return applyCarInsurance(res)})
        .catch((err)=> console.log(err))
        .then((res)=> {
            if(res.status && !res.duplicateLicensePlateNumber){
                console.log("Insurance applied successfully!");
                resolve({msg: "Success!", insuranceId: res.insuranceId});
            }
            else{
                if(res.duplicateLicensePlateNumber){
                    console.log("Duplicate license plate number!");
                    resolve({msg: "0"});
                }
                else{
                    resolve({msg: "-1"});
                }
            }
        })
        .catch((err)=> console.log(err))
    });
}

exports.apply = apply;

// insuranceDetails = {
//     "aadhaarNo": 100000000001,
// 	"customerName":  "A.Shrikant",
// 	"carModel": "Honda Amaze",
// 	"licensePlateNumber": "ABC125",
// 	"insurancePlan": "third-party",
//     "addressDetail": {
//         "address": "A/101, Circular Road",
//         "city": "Delhi",
//         "state": "Delhi",
//         "country": "India"
//     },
// 	"phone": 9292929291,
// 	"emailId": "abc123@gmail.com"
// }

// apply(insuranceDetails)
// .then(res=>{
//     console.log("#");
// })