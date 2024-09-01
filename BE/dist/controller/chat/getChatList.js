"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatList = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getChatList = async (req, res, next) => {
    try {
        const chatList = await init_1.default.chat.findMany({
            where: {
                users: {
                    some: {
                        id: req.user.id,
                    },
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
                    orderBy: { createdAt: "desc" },
                    select: {
                        text: true,
                        photoUri: true,
                        photo: {
                            select: {
                                id: true,
                                imageHeight: true,
                                imageUri: true,
                                imageWidth: true,
                            },
                        },
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
            orderBy: {
                updatedAt: "desc",
            },
        });
        if (chatList) {
            res.status(200).json({
                chatList,
            });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getChatList = getChatList;
