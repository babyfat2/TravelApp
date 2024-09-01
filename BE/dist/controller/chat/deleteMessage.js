"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const deleteMessage = async (id, authUserId) => {
    try {
        const message = await init_1.default.message.delete({
            where: {
                id,
            },
        });
        if (message) {
            return message;
        }
    }
    catch (e) {
        return e;
    }
};
exports.deleteMessage = deleteMessage;
