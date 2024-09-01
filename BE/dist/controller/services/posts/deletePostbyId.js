"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const deletePostById = async (req, res, next) => {
    const { id } = req.user;
    try {
        const postsToDelete = await init_1.default.post.delete({
            where: {
                id: req.body?.id,
                userId: id,
            },
        });
        if (postsToDelete) {
            res.json({ msg: "Post deleted" });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.deletePostById = deletePostById;
