const express = require('express');
const chatController = require('./chat.controller');
const router = express.Router();

router.post('/getResponseForTopicsChosen', chatController.get_response_for_topics_chosen);

router.post('/postChat', chatController.post_chat);

router.post('/getChat', chatController.get_chat);

router.post('/getChatDetail', chatController.get_chatDetail);

module.exports = router;

