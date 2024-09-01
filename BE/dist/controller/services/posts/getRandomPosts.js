"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomPosts = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const getRandomPosts = async (req, res, next) => {
    try {
        const posts = await init_1.default.post.findMany({
            orderBy: { id: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        userName: true,
                        verified: true,
                        imageUri: true,
                    },
                },
            },
            take: 20,
        });
        let uniqueNumbers = [];
        if (posts.length > 2) {
            const numbers = Array.from({ length: posts.length }, (_, i) => i);
            const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
            uniqueNumbers = shuffledNumbers.slice(0, posts.length);
        }
        else if (posts.length === 2) {
            uniqueNumbers = [0, 1];
        }
        else if (posts.length === 1) {
            uniqueNumbers = [0];
        }
        const randomPostToSend = [];
        for (let i in uniqueNumbers) {
            const filteredPosts = posts.filter((posts, idx) => idx == uniqueNumbers[i]);
            randomPostToSend.push(...filteredPosts);
        }
        return res.status(200).json({ posts: randomPostToSend });
    }
    catch (e) {
        next(e);
    }
};
exports.getRandomPosts = getRandomPosts;
