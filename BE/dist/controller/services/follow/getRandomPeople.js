"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomFollowers = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getRandomFollowers = async (req, res, next) => {
    try {
        const allUsers = await init_1.default.user.findMany({
            orderBy: { id: "desc" },
            select: {
                name: true,
                userName: true,
                id: true,
                imageUri: true,
            },
            take: 15,
        });
        let uniqueNumbers = [];
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
            const usersWithFollowStatus = allUsers.map((user) => {
                const isFollowed = loggedInUser.followingIDs.includes(user.id);
                return { ...user, isFollowed };
            });
            //console.log("🚀 ~ file: getRandomPeople.ts:41 ~ usersWithFollowStatus ~ usersWithFollowStatus:", loggedInUser.followingIDs)
            updatedUsers = usersWithFollowStatus;
        }
        if (allUsers.length > 2) {
            const numbers = Array.from({ length: allUsers.length - 1 }, (_, i) => i); // Create an array of numbers from 0 to 9
            const shuffledNumbers = numbers.sort(() => Math.random() - 0.5); // Shuffle the array
            uniqueNumbers = shuffledNumbers.slice(0, 3);
        }
        else if (allUsers.length === 2) {
            uniqueNumbers = [0, 1];
        }
        else if (allUsers.length === 1) {
            uniqueNumbers = [0];
        }
        const randomPeople = [];
        for (let i in uniqueNumbers) {
            const filteredPeople = updatedUsers.filter((posts, idx) => idx == uniqueNumbers[i] && posts.id !== req.user.id);
            randomPeople.push(...filteredPeople);
        }
        return res.status(200).json({ people: randomPeople });
    }
    catch (e) {
        next(e);
    }
};
exports.getRandomFollowers = getRandomFollowers;
