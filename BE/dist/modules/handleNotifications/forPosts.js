"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotificationsForPosts = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const handleNotificationsForPosts = async (text, userId, imageUri, notifUserIds, postId) => {
    try {
        if (!notifUserIds) {
            return;
        }
        const notif = await init_1.default.notification.createMany({
            data: notifUserIds?.map((notifUserId) => ({
                text,
                to: postId,
                type: "Posts",
                imageUri,
                userId: notifUserId.id,
                notifUserId: userId,
            })),
        });
        return notif;
    }
    catch (e) {
        return e;
    }
};
exports.handleNotificationsForPosts = handleNotificationsForPosts;
