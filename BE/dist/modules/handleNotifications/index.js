"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNotifications = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const handleNotifications = async (text, userId, type, remindDate, imageUri, notifUserId) => {
    try {
        const notif = await init_1.default.notification.create({
            data: {
                text,
                type,
                remindDate,
                imageUri,
                userId,
                notifUserId,
            },
        });
        return notif;
    }
    catch (e) {
        return e;
    }
};
exports.handleNotifications = handleNotifications;
