"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChatSocket = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const startChatSocket = async (authUserId, receiverId) => {
    try {
        if (authUserId === receiverId) {
            const myExistingChat = await init_1.default.chat.findMany({
                where: {
                    userIds: {
                        equals: [authUserId],
                    },
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
                        select: {
                            text: true,
                            sender: {
                                select: {
                                    id: true,
                                    userName: true,
                                },
                            },
                            id: true,
                            createdAt: true,
                        },
                    },
                },
            });
            if (myExistingChat) {
                const chat = {
                    ...myExistingChat[0],
                    isNew: false,
                    senderId: authUserId,
                };
                return chat;
            }
            const myNewChat = await init_1.default.chat.create({
                data: {
                    users: {
                        connect: [{ id: authUserId }],
                    },
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
                        select: {
                            text: true,
                            sender: {
                                select: {
                                    id: true,
                                    userName: true,
                                },
                            },
                            id: true,
                            createdAt: true,
                        },
                    },
                },
            });
            const chat = {
                ...myNewChat,
                isNew: false,
                senderId: authUserId,
            };
            return chat;
        }
        const existingChat = await init_1.default.chat.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [authUserId, receiverId],
                        },
                    },
                    {
                        userIds: {
                            equals: [receiverId, authUserId],
                        },
                    },
                ],
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
                    select: {
                        text: true,
                        sender: {
                            select: {
                                id: true,
                                userName: true,
                            },
                        },
                        id: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (existingChat[0]) {
            const chat = { ...existingChat[0], isNew: false, senderId: authUserId };
            return chat;
        }
        const newChat = await init_1.default.chat.create({
            data: {
                users: {
                    connect: [{ id: authUserId }, { id: receiverId }],
                },
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
                    select: {
                        text: true,
                        sender: {
                            select: {
                                id: true,
                                userName: true,
                            },
                        },
                        id: true,
                        createdAt: true,
                    },
                },
            },
        });
        console.log("new chat");
        const chat = { ...newChat, isNew: true, senderId: authUserId };
        return chat;
    }
    catch (e) {
        return e;
    }
};
exports.startChatSocket = startChatSocket;
