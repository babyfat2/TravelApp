"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const postComment = async (req, res, next) => {
    const { comment, id } = req.body;
    try {
        const commentPost = await init_1.default.comment.create({
            data: {
                comment,
                postId: id,
                userId: req.user.id,
            },
        });
        console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", commentPost);
        if (comment)
            return res.json({ msg: "commented" });
    }
    catch (e) {
        next(e);
    }
};
exports.postComment = postComment;
