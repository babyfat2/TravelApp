"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessages = void 0;
const library_1 = require("@prisma/client/runtime/library");
const init_1 = __importDefault(require("../../lib/prisma/init"));
const addMessages = async (text, chatId, id, senderId) => {
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
                text,
                id,
                sender: { connect: { id: senderId } },
                chat: { connect: { id: chatId } },
            },
        });
        console.log("🚀 ~ file: getMessages.ts:16 ~ messages:", messages);
    }
    catch (e) {
        if (e instanceof library_1.PrismaClientKnownRequestError) {
            // Handle known database errors
            console.error("Database error:", e.message);
        }
        else {
            // Handle unexpected errors
            console.error("Unexpected error:", e);
        }
        // Consider re-throwing the error or handling it as appropriate for your application
        throw e;
    }
};
exports.addMessages = addMessages;
