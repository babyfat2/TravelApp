"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("../../app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const startChatSocket_1 = require("../../controller/chat/startChatSocket");
const deleteMessage_1 = require("../../controller/chat/deleteMessage");
const addPhoto_1 = require("../../controller/chat/addPhoto");
const newMessage_1 = require("./newMessage");
const onlineUsers_1 = require("../onlineUsers");
const followStatus_1 = require("./followStatus");
const app_2 = require("../../app");
const getReceiverNotificationToken_1 = require("../../controller/chat/getReceiverNotificationToken");
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const init_1 = __importDefault(require("../../lib/expo/init"));
const IO = new socket_io_1.Server(app_1.default, { cookie: true });
IO.engine.use(app_2.sessionMiddleWare);
IO.use((socket, next) => {
    //@ts-ignore
    console.log("🍪", socket.handshake.headers);
    const token = socket.handshake?.auth?.token;
    console.log("🚀 ~ file: socket.ts:17 ~ IO.use ~ token:", socket.handshake?.auth);
    if (!token) {
        return next(new Error("Not authorized"));
    }
    const user = jsonwebtoken_1.default.verify(token, process.env.SECRET || "");
    console.log("🚀 ~ file: socket.ts:33 ~ IO.use ~ user:", user);
    if (user) {
        socket.data.userId = user.id;
        socket.data.userName = user.email;
        return next();
    }
    next(new Error("Not authorized"));
});
IO.on("connection", async (socket) => {
    console.log(`⚡: ${socket.data.userId} user just connected!`);
    const id = socket.data.userId;
    const userName = socket.data.userName;
    socket.emit("connected", socket.data.userId);
    socket.join(id);
    // if (!isAlreadyLoaded) {
    //   onlineUsers.push(id);
    // }
    onlineUsers_1.onlineState.addValue(id);
    IO.emit("online", onlineUsers_1.onlineState.getValues());
    socket.on("disconnect", async () => {
        socket.disconnect();
        onlineUsers_1.onlineState.deleteValue(id);
        IO.emit("online", onlineUsers_1.onlineState.getValues());
        console.log("🔥: A user disconnected");
    });
    socket.on("followedStatus", () => {
        (0, followStatus_1.followStatusEmit)(id, socket);
    });
    socket.on("startChat", async (receiverId) => {
        try {
            socket.join(receiverId);
            const chat = await (0, startChatSocket_1.startChatSocket)(id, receiverId);
            console.log("🚀 ~ file: socket.ts:102 ~ socket.on ~ id:", id);
            if (chat) {
                IO.to(receiverId).emit("newChat", chat);
            }
        }
        catch (e) { }
    });
    socket.on("chat", async (id) => {
        console.log("🚀 ~ file: socket.ts:73 ~ socket.on ~ id:", id);
        socket.join(id);
        //IO.to(id).emit("isOnline", { id, isOnline: true });
    });
    socket.on("newMessage", async (data) => {
        (0, newMessage_1.newMessage)(data, socket, id, userName);
    });
    socket.on("newPhoto", async (data) => {
        const onlineUsers = onlineUsers_1.onlineState.getValues();
        console.log("🚀 ~ file: socket.ts:76 ~ socket.on ~ data:", data);
        IO.to(data.chatId).emit("message", {
            message: {
                sender: data.message.sender,
                photo: {
                    imageUri: data?.message?.photo?.uri,
                    imageWidth: data?.message?.photo?.width,
                    imageHeight: data?.message?.photo?.height,
                },
                id: data.message?.id,
                createdAt: data?.message?.createdAt,
            },
            imageUri: data?.imageUri,
            chatId: data?.chatId,
        });
        socket.emit("sent", true);
        (0, addPhoto_1.addPhoto)(data.message.photo, data.chatId, data.id, id)
            .then((e) => { })
            .catch((e) => { });
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
                    body: `📷 sent a photo`,
                    subtitle: "sent a photo",
                    categoryId: "message",
                    data: {
                        chatId: data.chatId,
                        url: `qui-ojo://messages/${data.chatId}`,
                    },
                },
            ]);
        })
            .catch((e) => console.log(e));
    });
    socket.on("deleteMessage", async (messageId) => {
        console.log("🚀 ~ file: socket.ts:124 ~ socket.on ~ messageId:", messageId);
        (0, deleteMessage_1.deleteMessage)(messageId, id)
            .then((e) => {
            console.log(e);
        })
            .catch((e) => {
            console.log(e);
        });
    });
    socket.on("initChat", (id) => {
        console.log("🚀 ~ file: socket.ts:142 ~ socket.on ~ id:", id);
        socket.join(id);
        socket.emit("initChat", { id });
    });
    socket.on("isTyping", async (chatId, isTyping) => {
        IO.to(chatId).emit("isTyping", { id, isTyping });
        console.log("🚀 ~ file: socket.ts:83 ~ socket.on ~ isTyping:", {
            id,
            isTyping,
        });
    });
    socket.on("away", () => {
        console.log(`${id} is now away`);
        onlineUsers_1.onlineState.deleteValue(id);
        IO.emit("online", onlineUsers_1.onlineState.getValues());
    });
    socket.on("online", () => {
        console.log(`${id} is now online`);
        onlineUsers_1.onlineState.addValue(id);
        IO.emit("online", onlineUsers_1.onlineState.getValues());
    });
});
exports.default = IO;
