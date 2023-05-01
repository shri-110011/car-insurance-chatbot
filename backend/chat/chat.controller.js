const chatService = require("./chat.service");
const chatbotMsg = require("./chat-helper");

exports.get_response_for_topics_chosen = (req, res) => {
  const need = req.body.need;
  let chatMsg = "Bot provided option selected.";
  if (need != "intro")
    chatService.insertChat(chatMsg, need, req.body["chatDate"]);
  res.send(chatbotMsg.getResponseForTopicsChosen(req.body.need)); //Here we are passing the id attribute of the selected option which in this case is our intent.
};

exports.post_chat = (req, res) => {
  const userChatMsg = req.body["user-msg"];
  const responseObject = chatbotMsg.getResponseForUserChatMsg(
    req.body["user-msg"]
  );

  // Call to the database service.
  chatService.insertChat(userChatMsg, responseObject.intent, req.body.chatDate);

  res.send(responseObject.resMsg);
};

exports.get_user_chats = (req, res) => {
  //Promise has been used to execute code in synchronous manner
  //Without this the console.log() and res.send() codes which follow the chatService.retrieveChat() method gets executed first.
  chatService
    .retrieveUserChats(req.body.chatCount)
    .then((chatMsgArray) => {
      res.send(chatMsgArray);
    })
    .catch((err) => {
      console.log("Error occurred while retrieving chats!");
      res.status(err.error.statusCode).send(err);
    });
};

exports.get_chatDetails = (req, res) => {
  console.log(req.body);
  chatService
    .retrieveChatDetails()
    .then((chatDetailArray) => {
      res.send(chatDetailArray);
    })
    .catch((err) => {
      console.log("Error occurred while retrieving chat details!");
      res.status(err.error.statusCode).send(err);
    });
};
