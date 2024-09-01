"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessage = void 0;
const socket_1 = __importDefault(require("./socket"));
const addMessages_1 = require("../../controller/chat/addMessages");
const getReceiverNotificationToken_1 = require("../../controller/chat/getReceiverNotificationToken");
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const init_1 = __importDefault(require("../../lib/expo/init"));
const onlineUsers_1 = require("../onlineUsers");
const newMessage = async (data, socket, id, userName) => {
    console.log("🚀 ~ file: socket.ts:76 ~ socket.on ~ data:", data);
    socket_1.default.to(data.chatId).emit("message", data);
    socket_1.default.to(data.chatId).emit("newMsg", data);
    socket.emit("sent", true);
    (0, addMessages_1.addMessages)(data.message.text, data.chatId, data.id, id).then((e) => { });
    const onlineUsers = onlineUsers_1.onlineState.getValues();
    console.log("🚀 ~ file: newMessage.ts:20 ~ onlineUsers:", onlineUsers);
    (0, getReceiverNotificationToken_1.getReceiverNotificationToken)(data.chatId, id)
        .then((r) => {
        console.log("🚀 ~ file: newMessage.ts:26 ~ .then ~ r:", r);
        if (onlineUsers.includes(r.userId)) {
            console.log("⚠️⚠️⚠️");
            return;
        }
        console.log("🚀 ~ file: socket.ts:129 ~ .then ~ r:", r);
        if (!expo_server_sdk_1.default.isExpoPushToken(r.notificationId)) {
            return;
        }
        init_1.default.sendPushNotificationsAsync([
            {
                to: r.notificationId,
                sound: "default",
                badge: 1,
                mutableContent: true,
                title: `@${userName}`,
                body: `${data.message.text}`,
                subtitle: "sent a message",
                categoryId: "message",
                data: {
                    chatId: data.chatId,
                    url: `qui-ojo://messages/${data.chatId}`,
                },
            },
        ]);
    })
        .catch((e) => console.log(e));
};
exports.newMessage = newMessage;
