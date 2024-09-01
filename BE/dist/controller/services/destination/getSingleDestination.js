"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getSingleDestination = async (req, res, next) => {
    const idDestination = req.query.idDestination;
    try {
        const getSingleDestination = await init_1.default.destination.findUnique({
            where: {
                id: idDestination,
            },
            select: {
                name: true,
                description: true,
                location: true,
                images: {
                    where: {
                        destinationId: idDestination,
                    }
                },
                likes: {
                    where: {
                        userId: req.user.id
                    },
                    select: {
                        id: true,
                    }
                }
            }
        });
        res.json(getSingleDestination);
    }
    catch (e) {
        next(e);
    }
};
exports.getSingleDestination = getSingleDestination;
