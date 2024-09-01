"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPhoto = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const addPhoto = async (photo, chatId, id, senderId) => {
    try {
        const chat = await init_1.default.chat.update({
            where: {
                id: chatId,
            },
            data: {
                updatedAt: new Date(),
            },
        });
        console.log("🚀 ~ file: addMessages.ts:18 ~ chat:", chat);
        const messages = await init_1.default.message.create({
            data: {
                id,
                sender: {
                    connect: { id: senderId },
                },
                photo: photo?.height && photo?.uri && photo?.width
                    ? {
                        create: {
                            imageHeight: photo.height,
                            imageUri: photo.uri,
                            imageWidth: photo.width,
                        },
                    }
                    : undefined,
                chat: {
                    connect: { id: chatId },
                },
            },
        });
        console.log("🚀 ~ file: getMessages.ts:16 ~ messages:", messages);
    }
    catch (e) {
        console.error("Failed to add photo message:", e);
        throw e; // Rethrow or handle as needed
    }
};
exports.addPhoto = addPhoto;
