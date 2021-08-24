var conn = require('../../config/database');

const getConnectionObject = (user) => {
    return new Promise((resolve, reject) => {
        var connection = conn.getConnection();
        var metaObject = {}
        metaObject.user = user;
        metaObject.connection = connection;
        metaObject.status = false;
        metaObject.duplicateEmail = false;
        connection.connect(function(err){
            if(err){
                console.log("Error while connecting to the database inside getConnectionObject!");
                resolve(metaObject);
                throw err;
            }
            console.log("Connection established!");
            metaObject.status = true;
            resolve(metaObject);
        });
    })
}
   
const insertUser = (res) => {
    return new Promise ((resolve , reject)=>{
        // console.log(res);
        var connection = res.connection;
        if(res.status){
            var sql = "insert into users(emailId, userName, password) values (?, ?, ?)";
            var user = res.user
            connection.query(sql, [user.email, user.name, user.password], function(err, result){
                if(err){
                    console.log("Error while connecting to the database inside insertUser!");
                    res.status = false;
                    resolve(res);
                    throw err;
                }
                else{
                    //console.log(result);
                    console.log("User data stored to the database!");
                    connection.end(function(err){
                        if(!err){
                            console.log("Connection closed!");
                            //console.log(resultSet);
                            resolve(res);
                        }
                        else{
                            console.log("Error occurred while closing database connection inside insertUser!");
                            res.status = false;
                            resolve(res);
                            throw err;
                        }      
                    });      
                }
            });
        }
        else{
            connection.end(function(err){
                if(!err){
                    console.log("Connection closed!");
                }
                else{
                    console.log("Error occurred while closing database connection inside insertUser!");
                    throw err;
                }      
            });      
            console.log("res.status evaluated to false inside insertUser!");
            res.status = false;
            resolve(res);
        }    
    });
}

const checkEmailUniqueness = (res) => {
    return new Promise ((resolve , reject)=>{
        if(res.status){
            console.log("Inside checkEmailUniqueness");
            var connection = res.connection;
            var sql = "select * from users where EmailId = ? ";
            var email = res.user.email;
            //console.log(res.user.email)
            connection.query(sql, [email], (err, result)=>{
                if(err){
                    console.log("Error occurred while executing query inside checkEmailUniqueness!");
                    res.status = false;
                    resolve(res);
                    throw err;
                }
                else{
                    if(result.length>0) {
                        console.log("Details about already existing user");
                        console.log(result);
                    }
                }
                // console.log(result.length);
                if(result.length !== 0) {
                    res.status = false;
                    res.duplicateEmail = true;
                }
                // console.log(res.status);
                // console.log(res.duplicateEmail);
                resolve(res);
            });
        }
        else{
            resolve(res);
            console.log("res.status evaluated to false inside checkEmailUniqueness!");
        }
    });
}

const registerUser = (user) => {
    return new Promise((resolve, reject) => {
        getConnectionObject(user)
        .then((res) => {
            return checkEmailUniqueness(res)
        })
        .catch((err)=> console.log(err))
        .then((res) => {
            return insertUser(res)
        })
        .catch((err)=> console.log(err))
        .then((res) => {
            if(res.status === true && res.duplicateEmail === false){
                console.log("User registered successfully!");
                resolve(true)
            }
            else{
                if(res.duplicateEmail === true)
                    console.log("Duplicate email entered!");
                resolve(false)
            }    
        })
        .catch((err)=> console.log(err))
    })
}

exports.registerUser = registerUser;