"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentByPost = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getCommentByPost = async (req, res, next) => {
    const { id } = req.query;
    try {
        const comment = await init_1.default.comment.findMany({
            where: {
                postId: id?.toString(),
            },
            select: {
                id: true,
                comment: true,
                createdAt: true,
                User: {
                    select: {
                        verified: true,
                        imageUri: true,
                        name: true,
                        id: true,
                        userName: true,
                    },
                },
            },
        });
        if (comment) {
            res.json({ comment });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.getCommentByPost = getCommentByPost;
