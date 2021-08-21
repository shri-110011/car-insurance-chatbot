var conn = require('./database-connectivity');

function insertChat(chatMessage, chatIntent, chatDate){
    var connection = conn.getConnection();

    connection.connect(function(err){
        if(err)
            throw err;
        console.log("Connection established");
    });

    //Test data
    // var chatDate = new Date();
    // var chatMessage = "I want to know about car insurance coverages?";
    // var chatIntent = "insurance-coverages";
    var sql = "insert into ChatLog(chatMessage, chatIntent, chatDate) values (?, ?, ?)";
    connection.query(sql, [chatMessage, chatIntent, chatDate], function(err, result){
        if(err){
            throw err;
            //console.log("Error occurred!");
        }
        else{
            //console.log(result);
            console.log("Chat inserted");
        }
    });
    connection.end(function(err){
        if(!err)
            console.log("Connection closed!");
        else
            throw err;
    });
    return true;
}

function retrieveChat(){
    return new Promise((resolve, reject)=>{
        var connection = conn.getConnection();
        connection.connect(function(err){
            if(err)
                throw err;
            console.log("Connection established");
        });
    
        var sql = "select * from ChatLog order by chatDate desc limit 10;";
        var resultSet="[]";
        connection.query(sql, function(err, result){
            if(err){
                throw err;
                //console.log("Error occurred!");
            }
            else{
                //console.log(result);
                console.log("Chat retrieved");
                resultSet = result;
            }
        });
        connection.end(function(err){
            if(!err){
                console.log("Connection closed!");
                //console.log(resultSet);
                resolve(resultSet);
            }
            else{
                reject(err);
                throw err;
            }      
        });
    });
   
}
exports.insertChat = insertChat;
exports.retrieveChat = retrieveChat;

