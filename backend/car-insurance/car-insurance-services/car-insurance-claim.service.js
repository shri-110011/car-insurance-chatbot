var conn = require('../../config/database');

const getConnectionObject = (userData)=> {
    return new Promise((resolve, reject)=> {
        var connection = conn.getConnection();
        var metaObject = {};
        metaObject.userData = userData;
        metaObject.connection = connection;
        metaObject.status = false;
        metaObject.isInsuranceAlreadyClaimed = false;
        metaObject.isThereInsuranceIdEmailClash = false;
        metaObject.isInsuranceIdValid = true;
        connection.connect((err)=> {
            if(err){
                console.log("Error while connecting to the database inside getConnectionObject!");
                resolve(metaObject);
                throw err;
            }
            console.log("Connection established");
            metaObject.status = true;
            resolve(metaObject);
        });
    });
}

const checkForInsuranceIdAndClaimStatus = (res)=> {
    return new Promise((resolve, reject)=> {
        if(res.status){
            var connection = res.connection;
            var sql = "select email, claimStatus from customers where insuranceId = ?;";
            connection.query(sql, [res.userData.claimData.insuranceId], (err, resultSet)=>{
                console.log("###");
                console.log(res.userData.claimData);
                console.log(res.userData.claimData.insuranceId);
                if(err){
                    throw err;
                }
                else{
                    console.log(res.userData);
                    console.log(resultSet);
                    if(resultSet.length === 0){
                        res.isInsuranceIdValid = false;
                        res.status = false;
                        resolve(res);
                    }
                    else{
                        if(resultSet[0].email !== res.userData.userDataFromToken.email){
                            res.isThereInsuranceIdEmailClash = true;
                            res.status = false;
                        }
                        if(resultSet[0].claimStatus === "Claimed"){
                            res.isInsuranceAlreadyClaimed = true;
                            res.status = false;
                        }
                        resolve(res);
                    }
                }
            });
        }
        else{
            resolve(res);
            console.log("res.status evaluated to false inside checkForInsuranceIdAndClaimStatus!");
        }
    });
}

const claimCarInsurance = (res)=> {
    return new Promise((resolve, reject)=> {
        var connection = res.connection;
        if(res.status){
            var sql = `update customers set claimStatus = ?, 
            insuranceClaimedDate = ? where insuranceId = ?;`;
            connection.query(sql, ["Claimed",  
                res.userData.claimData.claimDate,
                res.userData.claimData.insuranceId,], 
                (err, resultSet)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log(resultSet);
                    if(resultSet.affectedRows !== 1){
                        res.status = false;
                    }
                    resolve(res);
                }
            });
        }
        else {
            connection.end(err=> {
                if(!err){
                    console.log("Connection closed!");
                    //console.log(resultSet);
                    resolve(res);
                }
                else{
                    console.log("Error occurred while closing database connection inside claimCarInsurance!");
                    resolve(res);
                }
                console.log("res.status evaluated to false inside claimCarInsurance!");
            });
        }
    });
}

const claim = (userData)=>{
    return new Promise((resolve, reject)=>{
        getConnectionObject(userData)
        .then((res)=> {return checkForInsuranceIdAndClaimStatus(res)})
        .catch(err=> console.log(err))
        .then((res)=> {return claimCarInsurance(res)})
        .catch(err=> console.log(err))
        .then((res)=> {
            console.log("$$$$");
            console.log("isInsuranceIdValid "+ res.isInsuranceIdValid);
            console.log("isThereInsuranceIdEmailClash "+res.isThereInsuranceIdEmailClash);
            console.log("isInsuranceAlreadyClaimed "+res.isInsuranceAlreadyClaimed);
            if(res.status){
                resolve({msg: "Success!"});
            }
            else{
                if(!res.isInsuranceIdValid){
                    resolve({msg: "-1"});
                }
                else{
                    if(res.isThereInsuranceIdEmailClash){
                        resolve({msg: "1"});
                    }
                    else{
                        if(res.isInsuranceAlreadyClaimed){
                            resolve({msg: "0"});
                        }
                    }
                }
                
            }
        })
    });
}

exports.claim = claim;

// userData = { 
//     insuranceId: 1000001,
//     userDataFromToken: {
//         email: "abc122@gmail.com"
//     }
// }

// claim(userData)
// .then(res=> {
//     console.log(res);
// });