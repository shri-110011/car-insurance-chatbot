const mysql = require('mysql2');
function getConnection(){
    const connection = mysql.createConnection({
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

/* establishDBConnection() will try to connect to the database. If connection
occurs without any errors then the promise returned by getConnectionObject() get
resolved else it gets rejected. In both cases we send the 'metaObject' which mainly
contains the database conenction object in the 'connection' property, back
to the invoking scope. And in the case when error occurs during database connection,
'metaObject' is set to contain the appropriate 'statusCode' and 'message' info. */
const establishDBConnection = () => {
    return new Promise((resolve, reject)=> {
        let connection = getConnection();
        let metaObject = {};
        metaObject.connection = connection;
        metaObject.statusCode = null;
        metaObject.message = null;

        connection.connect(function (err) {
            if (err) {
                console.log(
                "Error while connecting to the database inside establishDBConnection!"
                );
                console.log("Error message:", err.message);
                metaObject.statusCode = 500;
                metaObject.message = "Something went wrong in the server!";
                reject(metaObject);
            } else {
                console.log("Connection established!");
                resolve(metaObject);
            }
        });
    });
}

/* Closing the databse connection is an asynchronous task. And in case if an error 
occurs while closing  the databse connection, we do not want to report this error
to the client instead we just log the error to the console and then resolve the
promise.

Also note that we are closing the database connection only after all the database
access operations are complete for any request. So we will be returning the result
obtained by these database access operations back to client immediately and would
perform this closing of the database connection asynchronously.
 */
const closeDBConnection = (connection, errorMessage) => {
    return new Promise((resolve, reject) => {
        connection.ping(err => {
            if(err) {
                console.error('Error while pinging the database:', err);
                resolve();
            }
            else {
                console.log('Database connection is active...');
                connection.end(function (err) {
                    if (!err) {
                      console.log("Connection closed!");
                      resolve();
                    } else {
                      console.log(errorMessage);
                      console.log("Error message:", err.message);
                      resolve();
                    }
                });
            }
        })
    })
}

exports.establishDBConnection = establishDBConnection;
exports.closeDBConnection = closeDBConnection;