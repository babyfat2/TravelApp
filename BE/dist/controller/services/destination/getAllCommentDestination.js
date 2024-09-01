"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getAllCommentDestination = async (req, res, next) => {
    const idDestination = req.query.idDestination;
    try {
        const allCommentDestination = await init_1.default.comment.findMany({
            where: {
                destinationId: idDestination
            },
            select: {
                id: true,
                comment: true,
                User: {
                    select: {
                        id: true,
                        verified: true,
                        name: true,
                        imageUri: true,
                        userName: true,
                    }
                },
                createdAt: true,
            }
        });
        console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", allCommentDestination);
        if (allCommentDestination)
            return res.json({ msg: "commented", allCommentDestination });
    }
    catch (e) {
        next(e);
    }
};
exports.getAllCommentDestination = getAllCommentDestination;
