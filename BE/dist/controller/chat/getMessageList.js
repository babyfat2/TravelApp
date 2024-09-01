"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageList = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getMessageList = async (req, res, next) => {
    try {
        const chatList = await init_1.default.chat.findUnique({
            where: {
                id: req.query.id,
            },
            select: {
                id: true,
                users: {
                    select: {
                        userName: true,
                        name: true,
                        imageUri: true,
                        id: true,
                    },
                },
                messages: {
                    orderBy: { createdAt: "desc" },
                    select: {
                        text: true,
                        photoUri: true,
                        photo: true,
                        sender: {
                            select: {
                                userName: true,
                                id: true,
                            },
                        },
                        id: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (chatList) {
            const users = chatList.users.filter((users) => users.id !== req.user.id);
            const newChatList = { ...chatList, users };
            res.status(200).json({
                chatList: newChatList,
            });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getMessageList = getMessageList;
