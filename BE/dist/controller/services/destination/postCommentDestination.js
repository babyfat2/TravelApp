"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const postCommentDestination = async (req, res, next) => {
    const { comment, idDestination } = req.body;
    try {
        const commentDestination = await init_1.default.comment.create({
            data: {
                comment,
                destinationId: idDestination,
                userId: req.user.id,
            },
        });
        console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", commentDestination);
        if (comment)
            return res.json({ msg: "commented", commentDestination });
    }
    catch (e) {
        next(e);
    }
};
exports.postCommentDestination = postCommentDestination;
