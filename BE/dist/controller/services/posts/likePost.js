"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.like = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const like = async (req, res, next) => {
    const { id } = req.query;
    console.log("🚀 ~ file: likePost.ts:6 ~ like ~ like:");
    console.log("🚀 ~ file: likePost.ts:6 ~ like ~ id:", id);
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                id: req.user.id,
                like: {
                    some: {
                        postId: id,
                    },
                },
            },
        });
        console.log("🚀 ~ file: likePost.ts:20 ~ like ~ user:", user);
        if (!user) {
            console.log("yes");
            const posts = await init_1.default.like.create({
                data: {
                    user: { connect: { id: req.user.id } },
                    post: { connect: { id } },
                },
            });
            if (posts)
                return res.status(200).json({ msg: "liked" });
        }
        else {
            const likeToDelete = await init_1.default.like.findFirst({
                where: {
                    userId: req.user.id,
                    postId: req.query.id,
                },
            });
            console.log("🚀 ~ file: likePost.ts:39 ~ like ~ likeToDelete:", likeToDelete);
            if (!likeToDelete) {
                throw new Error("Like not found");
            }
            const deletePost = await init_1.default.like.delete({
                where: {
                    id: likeToDelete.id,
                },
            });
            if (deletePost) {
                return res.status(200).json({ msg: "unliked" });
            }
        }
    }
    catch (e) {
        next(e);
    }
};
exports.like = like;
