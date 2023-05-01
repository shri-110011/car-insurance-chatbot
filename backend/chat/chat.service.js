const db = require("../config/database");

function insertChat(chatMessage, chatIntent, chatDate) {
  db.establishDBConnection()
    .then((res) => {
      return new Promise((resolve, reject) => {
        res.errorMessage =
          "Error occurred while closing database connection after user chat insertion!";

        const sql =
          "insert into chatlog(chatMessage, chatIntent, chatDate) values (?, ?, ?)";
        const connection = res.connection;
        connection.query(
          sql,
          [chatMessage, chatIntent, chatDate],
          function (err, result) {
            if (err) {
              console.log(
                "An error occurred while issuing a query to insert the user chat into the database!"
              );
              console.log("Error message:", err.message);
              reject(res);
            } else {
              console.log("Chat inserted!");
              console.log(result);
              resolve();
              db.closeDBConnection(res.connection, res.errorMessage);
            }
          }
        );
      });
    })
    .catch((err) => {
      console.log(
        "Caught an error while inserting the user chat into the database!"
      );
      db.closeDBConnection(err.connection, err.errorMessage);
    });
}

function retrieveUserChats(chatCount) {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((res) => {
        return new Promise((resolve, reject) => {
          res.errorMessage =
            "Error occurred while closing database after retrieving user chats!";

          const count =
            chatCount === undefined || chatCount > 30 ? 10 : chatCount;
          console.log("count: " + count);
          const sql = "select * from chatlog order by chatDate desc limit ?;";
          const connection = res.connection;
          connection.query(sql, [count], function (err, result) {
            if (err) {
              console.log(
                "An error occurred while issuing a query to retrieve chats from the database!"
              );
              console.log("Error message:", err.message);
              res.statusCode = 500;
              res.message = "Something went wrong in the server!";
              reject(res);
            } else {
              console.log("Chats retrieved:");
              // console.log(result);
              resolve(result);
              db.closeDBConnection(res.connection, res.errorMessage);
            }
          });
        });
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(
          "Caught an error while retrieving user chats from the database!"
        );
        db.closeDBConnection(err.connection, err.errorMessage);
        let errorResponse = {
          error: { statusCode: err.statusCode, message: err.message },
        };
        reject(errorResponse);
      });
  });
}

function retrieveChatDetails() {
  return new Promise((resolve, reject) => {
    db.establishDBConnection()
      .then((res) => {
        return new Promise((resolve, reject) => {
          res.errorMessage =
            "Error occurred while closing database after retrieving chat details!";

          const sql = `select chatIntent, count(*) as 'chatCount' from chatlog group by 
                   chatIntent;`;
          const connection = res.connection;
          connection.query(sql, function (err, result) {
            if (err) {
              console.log(
                "An error occurred while issuing a query to retrieve the chat details from the database!"
              );
              console.log("Error message:", err.message);
              res.statusCode = 500;
              res.message = "Something went wrong in the server!";
              reject(res);
            } else {
              // console.log(result);
              console.log("Chat details retrieved");
              resolve(result);
              db.closeDBConnection(res.connection, res.errorMessage);
            }
          });
        });
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(
          "Caught an error while retrieving chat details from the database!"
        );
        db.closeDBConnection(err.connection, err.errorMessage);
        let errorResponse = {
          error: { statusCode: err.statusCode, message: err.message },
        };
        reject(errorResponse);
      });
  });
}

exports.insertChat = insertChat;
exports.retrieveUserChats = retrieveUserChats;
exports.retrieveChatDetails = retrieveChatDetails;
