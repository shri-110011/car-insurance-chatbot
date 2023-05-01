const express = require("express");
const chatController = require("./chat.controller");
const router = express.Router();

router.post(
  "/getResponseForTopicsChosen",
  chatController.get_response_for_topics_chosen
);

router.post("/postChat", chatController.post_chat);

router.post("/getUserChats", chatController.get_user_chats);

router.get("/getChatDetails", chatController.get_chatDetails);

module.exports = router;
