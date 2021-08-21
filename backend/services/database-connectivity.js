require('dotenv').config()
var mysql = require('mysql');
function getConnection(){
    var connection = mysql.createConnection({
        host: process.env.Host,
        user: process.env.User,
        password: process.env.Pwd,
        database: process.env.DB,
        port: process.env.MySQL_Port
    });
    return connection;
}

exports.getConnection = getConnection; 

// var con = getConnection();
// con.connect(function(err) {
// if (err) throw err;
// console.log("Connected!");
// });