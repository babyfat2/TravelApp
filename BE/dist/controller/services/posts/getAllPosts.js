"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getAllPosts = async (req, res, next) => {
    console.log("my user id is", req.user.id);
    const { take, skip } = req.query;
    try {
        const posts = await init_1.default.post.findMany({
            select: {
                like: {
                    select: {
                        userId: true,
                    },
                    where: {
                        userId: req.user.id,
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
                link: {
                    select: {
                        id: true,
                        imageHeight: true,
                        imageUri: true,
                        imageWidth: true,
                        title: true,
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
        if (posts) {
            return res.status(200).json({ posts });
        }
        throw new Error("Error in trying get posts");
    }
    catch (e) {
        next(e);
    }
};
exports.getAllPosts = getAllPosts;
