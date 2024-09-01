"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByFollowing = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getPostByFollowing = async (req, res, next) => {
    const { id } = req.user;
    const { take, skip } = req.query;
    try {
        const followedUserIds = await init_1.default.user.findUnique({
            where: { id },
            select: { followingIDs: true },
        });
        if (followedUserIds) {
            const postsByFollowing = await init_1.default.post.findMany({
                where: {
                    OR: [
                        {
                            userId: {
                                in: followedUserIds.followingIDs,
                            },
                        },
                        {
                            repostUserId: {
                                hasSome: followedUserIds.followingIDs,
                            },
                        },
                        {
                            like: {
                                some: {
                                    userId: {
                                        in: followedUserIds.followingIDs,
                                    },
                                },
                            },
                        },
                    ],
                },
                select: {
                    like: {
                        select: {
                            userId: true,
                        },
                    },
                    createdAt: true,
                    postText: true,
                    link: {
                        select: {
                            id: true,
                            imageHeight: true,
                            imageUri: true,
                            imageWidth: true,
                            title: true,
                        },
                    },
                    id: true,
                    photoUri: true,
                    userId: true,
                    repostUser: {
                        select: {
                            id: true,
                        },
                        where: {
                            id: req.user.id,
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            imageUri: true,
                            name: true,
                            userName: true,
                            verified: true,
                        },
                    },
                    photo: {
                        select: {
                            id: true,
                            imageUri: true,
                            imageHeight: true,
                            imageWidth: true,
                        },
                    },
                    _count: {
                        select: {
                            like: true,
                            comments: true,
                            repostUser: true,
                        },
                    },
                },
                orderBy: [
                    {
                        id: "desc",
                    },
                ],
                take: Number(take),
                skip: Number(skip),
            });
            if (postsByFollowing) {
                console.log("🚀 ~ file: getPostByFollowing.ts:86 ~ postsByFollowing:", postsByFollowing);
                return res.status(200).json({ posts: postsByFollowing });
            }
        }
        return res.status(400).json({ msg: "Bad Request" });
    }
    catch (e) {
        next(e);
    }
};
exports.getPostByFollowing = getPostByFollowing;
