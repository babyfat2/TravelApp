"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getAllDestination = async (req, res, next) => {
    try {
        const getAllDestination = await init_1.default.destination.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                images: true,
            }
        });
        res.json(getAllDestination);
    }
    catch (e) {
        next(e);
    }
};
exports.getAllDestination = getAllDestination;
