"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForPosts = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const searchForPosts = async (req, res, next) => {
    const { q } = req.query;
    console.log("🚀 ~ file: searchForPosts.ts:10 ~ q:", q);
    try {
        const posts = await init_1.default.post.findMany({
            where: {
                postText: { contains: q?.toString(), mode: "insensitive" },
            },
            orderBy: { id: "desc" },
            select: {
                like: {
                    select: {
                        userId: true,
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
                        //@ts-ignore
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
            take: 15,
        });
        if (posts) {
            return res.status(200).json({ posts });
        }
        res.status(404).json({ posts: [], msg: "Not Found" });
    }
    catch (e) {
        next(e);
    }
};
exports.searchForPosts = searchForPosts;
