"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveNotificationId = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const saveNotificationId = async (req, res, next) => {
    try {
        const notificationId = await init_1.default.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                notificationId: req.body.notificationId,
            },
        });
        console.log("🚀 ~ file: saveNotificationId.ts:18 ~ notificationId:", notificationId);
        if (notificationId) {
            return res.json({ msg: "notificationId saved" });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.saveNotificationId = saveNotificationId;
