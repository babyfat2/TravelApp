"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleDestination = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getSingleDestination = async (req, res, next) => {
    const idDestination = req.query.idDestination;
    console.log(req);
    try {
        const getSingleDestination = await init_1.default.destination.findUnique({
            where: {
                id: idDestination,
            }
        });
        res.json(getSingleDestination);
    }
    catch (e) {
        next(e);
    }
};
exports.getSingleDestination = getSingleDestination;
