"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDestination = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const searchDestination = async (req, res, next) => {
    const { q } = req.query;
    console.log("🚀 ~ file: searchDestination.ts:10 ~ q:", q);
    try {
        if (!q || q.toString().trim() === "") {
            const allDestinations = await init_1.default.destination.findMany({});
            return res.status(200).json({ allDestinations });
        }
        const destination = await init_1.default.destination.findMany({
            where: {
                OR: [
                    { name: { contains: q?.toString(), mode: "insensitive" } },
                    { location: { contains: q?.toString(), mode: "insensitive" } },
                ],
            },
            take: 15,
        });
        if (destination) {
            return res.status(200).json({ destination });
        }
        res.status(404).json({ destination: [], msg: "Not Found" });
    }
    catch (e) {
        next(e);
    }
};
exports.searchDestination = searchDestination;
