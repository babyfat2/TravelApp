"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowersList = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getFollowersList = async (req, res, next) => {
    const { id } = req.user;
    const { take, skip } = req.query;
    console.log("🚀 ~ file: getFollowersList.ts:11 ~ skip:", skip, take);
    try {
        const followers = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                followingIDs: true,
                followers: {
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
        if (followers) {
            const usersWithFollowStatus = followers.followers.map((user) => {
                const isFollowed = followers.followingIDs.includes(user.id);
                return { ...user, isFollowed };
            });
            return res.status(200).json(usersWithFollowStatus);
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getFollowersList = getFollowersList;
