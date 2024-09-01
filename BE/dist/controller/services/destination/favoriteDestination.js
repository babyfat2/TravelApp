"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const likeDestination = async (req, res, next) => {
    const idUser = req.user.id;
    const idDestination = req.query.idDestination;
    console.log(idUser + idDestination);
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                id: req.user.id,
                like: {
                    some: {
                        destinationId: idDestination,
                    },
                },
            },
        });
        console.log("🚀 ~ file: likePost.ts:20 ~ like ~ user:", user);
        if (!user) {
            const likeDestination = await init_1.default.like.create({
                data: {
                    user: {
                        connect: {
                            id: idUser
                        }
                    },
                    destination: {
                        connect: {
                            id: idDestination
                        }
                    }
                }
            });
            res.json(likeDestination);
        }
        else {
            const likeDestinationDelete = await init_1.default.like.findFirst({
                where: {
                    userId: req.user.id,
                    destinationId: req.query.idDestination,
                }
            });
            if (!likeDestinationDelete) {
                throw new Error("Like not found");
            }
            const deleteLike = await init_1.default.like.delete({
                where: {
                    id: likeDestinationDelete.id,
                },
            });
            if (deleteLike) {
                return res.status(200).json({ msg: "delete Favortie" });
            }
        }
    }
    catch (e) {
        next(e);
    }
};
exports.likeDestination = likeDestination;
