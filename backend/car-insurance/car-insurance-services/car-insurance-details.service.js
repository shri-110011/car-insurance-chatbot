var conn = require('../../config/database');

const getInsuranceDetail = ()=> {
    return new Promise((resolve, reject)=> {
        var connection = conn.getConnection();
        connection.connect(err=> {
            if(err){
                throw error;
            }
            var sql = "select insurancePlan, count(*) insuranceCount from customers group by insurancePlan;";
            connection.query(sql, (err, resultSet)=> {
                if(err){
                    throw error;
                }
                else{
                    console.log(resultSet);
                    console.log("Insurance details retreived!");
                    connection.end(function(err){
                        if(!err){
                            console.log("Connection closed!");
                            //console.log(resultSet);
                            resolve(resultSet);
                        }
                        else{
                            console.log("Error occurred while closing database connection inside getInsuranceDetail!");
                            // res.status = false;
                            // resolve(res);
                            throw err;
                        }      
                    });  
                }
                
            });
        });
    })
}

const userCarInsuranceDetails = (userDataFromToken)=> {
    return new Promise((resolve, reject)=> {
        var connection = conn.getConnection();
        connection.connect(err=> {
            if(err) {
                throw err;
            }
            var sql = "select * from customers where email = ?";
            connection.query(sql, [userDataFromToken.email], (err, resultSet)=> {
                if(err){
                    throw error;
                }
                else{
                    console.log(resultSet);
                    console.log("User insurance details fetched!");
                    connection.end(err=> {
                        if(!err){
                            console.log("Connection closed!");
                            //console.log(resultSet);
                            resolve(resultSet);
                        }
                        else{
                            console.log("Error occurred while closing database connection inside getUserInsuranceDetails!");
                            resolve(resultSet);
                        }  
                    });
                }
            })
        });
    });
}

exports.userCarInsuranceDetails = userCarInsuranceDetails;
exports.getInsuranceDetail = getInsuranceDetail;