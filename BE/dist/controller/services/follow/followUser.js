"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const updateFollows_1 = __importDefault(require("../../../modules/socket/updateFollows"));
const expo_server_sdk_1 = __importDefault(require("expo-server-sdk"));
const init_2 = __importDefault(require("../../../lib/expo/init"));
const handleNotifications_1 = require("../../../modules/handleNotifications");
const followUser = async (req, res, next) => {
    const { id, email } = req.user;
    console.log("🚀 ~ file: followUser.ts:7 ~ followUser ~ id:", id);
    function isMultipleOf10(number) {
        return number % 10 === 0;
    }
    if (id === req.query.id) {
        return res.status(200).json({ msg: "can't follow self" });
    }
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                followingIDs: true,
                notificationId: true,
            },
        });
        const followedUser = await init_1.default.user.findUnique({
            where: {
                id: req.query.id,
            },
            select: {
                followingIDs: true,
                notificationId: true,
            },
        });
        console.log("includes id", user?.followingIDs.includes(req.query.id));
        if (user?.followingIDs.includes(req.query.id)) {
            const userWithUnFollow = await init_1.default.user.update({
                where: {
                    id,
                },
                data: {
                    following: {
                        disconnect: {
                            id: req.query?.id,
                        },
                    },
                },
            });
            if (userWithUnFollow) {
                const userFollow = (0, updateFollows_1.default)(req.user.id);
                const guestFollow = (0, updateFollows_1.default)(req.query?.id);
                Promise.all([userFollow, guestFollow])
                    .then((values) => {
                    return res.status(200).json({
                        msg: "unfollowed",
                    });
                })
                    .catch((e) => {
                    return res.status(200).json({
                        msg: "unfollowed",
                    });
                });
            }
            return;
        }
        else {
            const userWithFollower = await init_1.default.user.update({
                where: {
                    id,
                },
                data: {
                    following: {
                        connect: {
                            id: req.query?.id,
                        },
                    },
                },
            });
            if (userWithFollower) {
                (0, handleNotifications_1.handleNotifications)(`@${email} just followed you`, req.query.id, "Follow", undefined, undefined, id);
                if (isMultipleOf10((followedUser?.followingIDs?.length || 0) + 1) ||
                    (followedUser?.followingIDs?.length || 0) <= 9) {
                    if (!expo_server_sdk_1.default.isExpoPushToken(followedUser?.notificationId)) {
                        return;
                    }
                    console.log("reached this point", followedUser?.notificationId);
                    init_2.default.sendPushNotificationsAsync([
                        {
                            to: followedUser?.notificationId,
                            sound: "default",
                            title: `+1 Follow`,
                            body: `@${email} just followed you`,
                            subtitle: "followed you",
                        },
                    ]);
                }
                const userFollow = (0, updateFollows_1.default)(req.user.id);
                const guestFollow = (0, updateFollows_1.default)(req.query?.id);
                Promise.all([userFollow, guestFollow])
                    .then((values) => {
                    return res.status(200).json({
                        msg: "followed",
                    });
                })
                    .catch((e) => {
                    return res.status(200).json({
                        msg: "followed",
                    });
                });
            }
        }
    }
    catch (e) {
        next(e);
    }
};
exports.followUser = followUser;
