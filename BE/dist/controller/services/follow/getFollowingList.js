"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingList = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getFollowingList = async (req, res, next) => {
    const { id } = req.user;
    const { take, skip } = req.query;
    try {
        const following = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                following: {
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        imageUri: true,
                        verified: true,
                    },
                    take: Number(take),
                    skip: Number(skip),
                },
            },
        });
        if (following) {
            return res.status(200).json(following.following);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getFollowingList = getFollowingList;
