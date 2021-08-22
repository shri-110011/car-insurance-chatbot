var mysql = require('mysql2');
function getConnection(){
    var connection = mysql.createConnection({
        host: process.env.Host,
        user: process.env.User,
        password: process.env.Pwd,
        database: process.env.DB,
        port: process.env.MySQL_Port,
        timezone: '+05:30',
        multipleStatements: true
    });
    return connection;
}

exports.getConnection = getConnection; 