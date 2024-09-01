"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestinationLikeByUser = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getDestinationLikeByUser = async (req, res, next) => {
    const { id } = req.user;
    try {
        const destinations = await init_1.default.destination.findMany({
            where: {
                likes: {
                    some: {
                        userId: id,
                    }
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                images: true,
            }
        });
        if (destinations) {
            return res.json(destinations);
        }
        throw new Error("Error in trying get posts");
    }
    catch (e) {
        next(e);
    }
};
exports.getDestinationLikeByUser = getDestinationLikeByUser;
