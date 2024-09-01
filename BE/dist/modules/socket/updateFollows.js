"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = __importDefault(require("../../lib/prisma/init"));
async function updateFollowerCounts(userId) {
    const followersCount = await init_1.default.user.count({
        where: { following: { some: { id: userId } } },
    });
    console.log("🚀 ~ file: updateFollows.ts:7 ~ updateFollowerCounts ~ followersCount:", followersCount);
    const followingCount = await init_1.default.user.count({
        where: { followers: { some: { id: userId } } },
    });
    console.log("🚀 ~ file: updateFollows.ts:12 ~ updateFollowerCounts ~ followingCount:", followingCount);
    await init_1.default.user.update({
        where: { id: userId },
        data: { followersCount, followingCount },
    });
}
exports.default = updateFollowerCounts;
