"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPeople = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const searchPeople = async (req, res, next) => {
    const { q } = req.query;
    console.log("🚀 ~ file: searchForPeople.ts:10 ~ q:", q);
    try {
        const people = await init_1.default.user.findMany({
            where: {
                OR: [
                    { userName: { contains: q?.toString(), mode: "insensitive" } },
                    { name: { contains: q?.toString(), mode: "insensitive" } },
                ],
            },
            select: {
                name: true,
                userName: true,
                id: true,
                imageUri: true,
            },
            orderBy: { id: "desc" },
            take: 15,
        });
        const loggedInUser = await init_1.default.user.findUnique({
            where: {
                id: req.user?.id,
            },
            select: {
                followingIDs: true,
            },
        });
        let updatedUsers = [];
        if (loggedInUser) {
            const usersWithFollowStatus = people.map((user) => {
                const isFollowed = loggedInUser.followingIDs.includes(user.id);
                return { ...user, isFollowed };
            });
            console.log("🚀 ~ file: getRandomPeople.ts:41 ~ usersWithFollowStatus ~ usersWithFollowStatus:", loggedInUser.followingIDs);
            updatedUsers = usersWithFollowStatus;
        }
        if (people) {
            console.log("🚀 ~ file: searchPeople.ts:30 ~ people:", updatedUsers);
            return res.status(200).json({ people: updatedUsers });
        }
        res.status(404).json({ people: [], msg: "Not Found" });
    }
    catch (e) {
        next(e);
    }
};
exports.searchPeople = searchPeople;
