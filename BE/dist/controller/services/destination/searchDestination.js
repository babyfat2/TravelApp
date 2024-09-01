"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getSearchDestination = async (req, res, next) => {
    const { q } = req.query;
    console.log("🚀 ~ file: searchDestination.ts:10 ~ q:", q);
    try {
        if (!q || q.toString().trim() === "") {
            const allDestinations = await init_1.default.destination.findMany({});
            return res.status(200).json({ allDestinations });
        }
        const Destinations = await init_1.default.destination.findMany({
            where: {
                OR: [
                    { name: { contains: q?.toString(), mode: "insensitive" } },
                    { location: { contains: q?.toString(), mode: "insensitive" } },
                ],
            },
            take: 15,
            select: {
                id: true,
                name: true,
                description: true,
                location: true,
                images: true,
            }
        });
        if (Destinations) {
            return res.status(200).json({ Destinations });
        }
        res.status(404).json({ Destinations: [], msg: "Not Found" });
    }
    catch (e) {
        next(e);
    }
};
exports.getSearchDestination = getSearchDestination;
