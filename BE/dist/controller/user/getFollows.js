"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollows = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getFollows = async (req, res, next) => {
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                followersCount: true,
                followingCount: true,
            },
        });
        if (user) {
            res.json({
                following: user.followingCount?.toString(),
                followers: user.followersCount?.toString(),
            });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getFollows = getFollows;
