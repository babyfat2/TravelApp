"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getNotifications = async (req, res, next) => {
    try {
        console.log(req.user.id, "hjhj");
        const notifications = await init_1.default.notification.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                notifUser: {
                    select: {
                        userName: true,
                        imageUri: true,
                        id: true,
                        name: true,
                        verified: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        if (notifications) {
            return res.status(200).json({ notifications });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getNotifications = getNotifications;
