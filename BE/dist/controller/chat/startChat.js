"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startChat = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const startChat = async (req, res, next) => {
    try {
        const existingChat = await init_1.default.chat.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [req.user.id, req.body.userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [req.body.userId, req.user.id],
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
            const users = existingChat[0].users.filter((exChat) => exChat.id !== req.user.id);
            const chat = { ...existingChat[0], users };
            return res.status(200).json({ chat });
        }
        const chat = await init_1.default.chat.create({
            data: {
                users: {
                    connect: [{ id: req.user.id }, { id: "64e3f28156ebaa948e07da4f" }],
                },
            },
            include: {
                users: true,
                messages: true,
            },
        });
        return res.json({ chat });
    }
    catch (e) {
        next(e);
    }
};
exports.startChat = startChat;
