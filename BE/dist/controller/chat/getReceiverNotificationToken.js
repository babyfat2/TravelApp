"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceiverNotificationToken = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getReceiverNotificationToken = async (chatId, authUserId) => {
    console.log("🚀 ~ file: getReceiverNotificationToken.ts:7 ~ authUserId:", authUserId);
    console.log("🚀 ~ file: getReceiverNotificationToken.ts:7 ~ chatId:", chatId);
    try {
        const userIds = await init_1.default.chat.findUnique({
            where: {
                id: chatId,
            },
            select: {
                userIds: true,
            },
        });
        if (userIds) {
            const userId = userIds?.userIds.find((id) => id !== authUserId);
            const user = await init_1.default.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    notificationId: true,
                },
            });
            if (user) {
                return { notificationId: user.notificationId, userId };
            }
        }
    }
    catch (e) {
        return e;
    }
};
exports.getReceiverNotificationToken = getReceiverNotificationToken;
