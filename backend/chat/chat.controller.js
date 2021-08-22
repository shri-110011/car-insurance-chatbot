const chatService = require('./chat.service');
const chatbotMsg = require('./chatbotMsg');

exports.get_response_for_topics_chosen = (req, res)=> {
    //res.send("ok");
    var need =  req.body.need;
    console.log("Inside get_response_for_topics_chosen");
    console.log("req.body :");
    console.log(req.body);
    // console.log(need);
    //res.send([]);
    var chatMsg = "Bot provided option selected.";
    if(need!="intro")
        chatService.insertChat(chatMsg, need, req.body["chatDate"]);
    // console.log("***");
    // console.log("###");
    res.send(chatbotMsg.getResponseForTopicsChosen(req.body.need));//Here we are passing the id attribute of the selected option which in this case is our intent
}

exports.post_chat = (req, res)=> {
    // res.send("ok");
    console.log(req.body);
    console.log(req.body['user-msg']);//Here since the attribute/key name contains hypen(-) symbol so to access the object's key value square brackets are needed otherwise it will lead to internal server error
    var userChatMsg = req.body['user-msg'];
    var responseObject = chatbotMsg.getResponseForUserChatMsg(req.body['user-msg']);
    
    //Call to the database service
    chatService.insertChat(userChatMsg, responseObject.intent, req.body["chatDate"]);
    
    res.send(responseObject.resMsg);
}

exports.get_chat = (req, res)=> {
    //Promise has been used to execute code in synchronous manner
    //Without this the console.log() and res.send() codes which follow the chatService.retrieveChat() method gets executed first.
    console.log(req.body);
    chatService.retrieveChat(req.body.chatCount).then((chatMsgArray) => {
        console.log("Inside /getChat then");
        // console.log(chatMsgArray);//This will display the retreived chats from the database.
        res.send(chatMsgArray);
    }).catch((err)=>{
        console.log("Inside /getChat catch");
        console.log(err);
        res.send("Error");
    });
}

exports.get_chatDetail = (req, res)=> {
    console.log(req.body);
    chatService.retrieveChatDetail().then(chatDetailArray=> {
        res.send(chatDetailArray);
    });
}