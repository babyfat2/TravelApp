"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSinglePost = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getSinglePost = async (req, res, next) => {
    const { id } = req.query;
    try {
        const posts = await init_1.default.post.findUnique({
            where: {
                id,
            },
            select: {
                like: {
                    select: {
                        userId: true,
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
                createdAt: true,
                postText: true,
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
                link: {
                    select: {
                        id: true,
                        imageHeight: true,
                        imageUri: true,
                        imageWidth: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        like: true,
                        comments: true,
                    },
                },
            },
        });
        console.log("🚀 ~ file: getMyPosts.ts:55 ~ posts:", posts);
        if (posts) {
            res.status(200).json({ posts });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getSinglePost = getSinglePost;
