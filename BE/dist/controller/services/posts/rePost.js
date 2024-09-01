"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rePost = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const rePost = async (req, res, next) => {
    try {
        const repostUserId = await init_1.default.post.findUnique({
            where: {
                id: req.query.id,
            },
            select: {
                repostUserId: true,
            },
        });
        if (repostUserId?.repostUserId.includes(req.user.id)) {
            const postToAdd = await init_1.default.post.update({
                where: {
                    id: req.query.id,
                },
                data: {
                    repostUser: {
                        disconnect: { id: req.user.id },
                    },
                },
            });
            if (postToAdd) {
                return res.status(200).json({
                    msg: "repost removed",
                });
            }
            return res.status(400).json({
                msg: "failed",
            });
        }
        else {
            const postToAdd = await init_1.default.post.update({
                where: {
                    id: req.query.id,
                },
                data: {
                    repostUser: {
                        connect: { id: req.user.id },
                    },
                },
            });
            if (postToAdd) {
                return res.status(200).json({
                    msg: "successfully reposted",
                });
            }
            return res.status(400).json({
                msg: "failed",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.rePost = rePost;
