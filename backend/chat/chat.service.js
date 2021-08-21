var conn = require('../config/database');

function insertChat(chatMessage, chatIntent){
    //Test data
    // var chatDate = new Date();
    // var chatMessage = "I want to know about car insurance coverages?";
    // var chatIntent = "insurance-coverages";

    getDBConnection().then((res)=> {
        return new Promise((resolve, reject)=> {
            var sql = "insert into chatlog(chatMessage, chatIntent) values (?, ?)";
            let connection = res["connection"];
            connection.query(sql, [chatMessage, chatIntent], function(err, result){
                if(err){
                    throw err;
                    //console.log("Error occurred!");
                }
                else{
                    //console.log(result);
                    console.log("Chat inserted");
                    res["result"] = true;
                    resolve(res);
                }
            });
        });
    })
    .then((res)=> {
        return closeDBConnection(res);
    })
    .then((res)=> {
        return res["result"];
    });
}

var res = {};

var getDBConnection = ()=> {
    return new Promise((resolve, reject)=> {
        let connection = conn.getConnection();
        console.log("Inside chat.service Flag1 ---------------------");
        connection.connect(function(err){
            if(err)
                throw err;
            res["connection"] = connection;
            console.log("Connection established");
            resolve(res);
        });
    });
};

var closeDBConnection = (res)=> {
    return new Promise((resolve, reject)=> {
        let connection = res["connection"];
        if(connection) { 
            connection.end(function(err){
                if(!err){
                    console.log("Connection closed!");
                    //console.log(resultSet);
                    resolve(res["result"]);
                }
                else{
                    throw err;
                }      
            });
        }
    });
}
function retrieveChat(chatCount){
    return new Promise((resolve, reject)=> {
        console.log("Inside retrieve chat");
        getDBConnection().then((res)=> {
            return new Promise((resolve, reject)=> {
                console.log("Inside chat.service Flag 2 ---------------------");
                var count = (chatCount === undefined) || (chatCount > 30)? 10: chatCount;
                console.log("count "+count);
                var sql = "select * from chatlog order by chatDate desc limit ?;";
                let connection = res["connection"];
                console.log("Querying database");
                connection.query(sql, [count], function(err, result) {
                    if(err){
                        throw err;
                        //console.log("Error occurred!");
                    }
                    else{
                        // console.log(result);
                        console.log("Chat retrieved");
                        res["result"]=result;
                        resolve(res);
                    }
                });
            })
        })
        .then((res)=> {
            return closeDBConnection(res);
        })
        .then((res)=> {
            // console.log("##@");
            // console.log(res);
            resolve(res);
        })
    });
   
}

function retrieveChatDetail(){
    return new Promise((resolve, reject)=> {
        getDBConnection().then((res)=> {
            return new Promise((resolve, reject)=> {
                console.log("Inside chat.service Flag 3 ---------------------");
                var sql = `select chatIntent, count(*) as 'chatCount' from chatlog group by 
                   chatIntent;`;
                let connection = res["connection"];
                connection.query(sql, function(err, result){
                    if(err){
                        throw err;
                        //console.log("Error occurred!");
                    }
                    else{
                        // console.log(result);
                        console.log("Chat details retrieved");
                        res["result"] = result;
                        resolve(res);
                    }
                });
            })
        })
        .then((res)=> {
            return closeDBConnection(res);
        })
        .then(res=> {
            resolve(res);
        })
    });
}

exports.insertChat = insertChat;
exports.retrieveChat = retrieveChat;
exports.retrieveChatDetail = retrieveChatDetail;
