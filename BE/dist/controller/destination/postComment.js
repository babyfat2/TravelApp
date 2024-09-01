"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const postComment = async (req, res, next) => {
    const { comment, destinationId, userId } = req.body;
    try {
        const commentPost = await init_1.default.commentDestination.create({
            data: {
                comment,
                destinationId,
                userId,
            },
        });
        console.log("🚀 ~ file: postComment.ts:19 ~ commentPost:", commentPost);
        if (comment)
            return res.json({ msg: "destination commented" });
    }
    catch (e) {
        next(e);
    }
};
exports.postComment = postComment;
