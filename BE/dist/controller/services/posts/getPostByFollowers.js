"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getAllPosts = async (req, res, next) => {
    const { id } = req.user;
    try {
        const posts = await init_1.default.user.findMany({
            where: {
                id
            },
            select: {
                following: {}
            }
        });
        if (posts) {
            return res.json({ posts });
        }
        throw new Error("Error in trying get posts");
    }
    catch (e) {
        next(e);
    }
};
exports.getAllPosts = getAllPosts;
