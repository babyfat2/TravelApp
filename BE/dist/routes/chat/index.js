"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const startChat_1 = require("../../controller/chat/startChat");
const getChatList_1 = require("../../controller/chat/getChatList");
const getMessageList_1 = require("../../controller/chat/getMessageList");
const router = (0, express_1.Router)();
router.get("/", (req) => {
    console.log("🚀 ~ file: index.ts:6 ~ router.get ~ req:", req);
});
router.post("/startChat", startChat_1.startChat);
router.get("/get-all-chats", getChatList_1.getChatList);
router.get("/get-all-messages", getMessageList_1.getMessageList);
exports.default = router;
