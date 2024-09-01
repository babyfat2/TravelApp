"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const updateFollows_1 = __importDefault(require("../../../modules/socket/updateFollows"));
const unfollowUser = async (req, res, next) => {
    const { id } = req.user;
    console.log("🚀 ~ file: followUser.ts:7 ~ followUser ~ id:", id);
    try {
        const userWithFollower = await init_1.default.user.update({
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
        if (userWithFollower) {
            (0, updateFollows_1.default)(req.user.id)
                .then(() => console.log("Follower counts updated"))
                .catch((error) => console.error("Error updating follower counts:", error));
            (0, updateFollows_1.default)(req.query?.id)
                .then(() => console.log("Follower counts updated"))
                .catch((error) => console.error("Error updating follower counts:", error));
        }
        return res.status(200).json({
            msg: "unfollowed",
        });
    }
    catch (e) {
        next(e);
    }
};
exports.unfollowUser = unfollowUser;
