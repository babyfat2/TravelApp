"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromRedis = void 0;
const init_1 = __importDefault(require("../../lib/redis/init"));
const removeFromRedis = async (id) => {
    try {
        // Remove all occurrences of the specified ID from the "online" list
        const removedCount = await init_1.default.lrem("online", 0, id);
        console.log("🚀 ~ file: removeOnlineList.ts:7 ~ removeFromRedis ~ removedCount:", removedCount);
        if (removedCount) {
            const onlineList = await init_1.default.lrange("online", 0, -1);
            console.log("🚀 ~ file: removeOnlineList.ts:10 ~ removeFromRedis ~ onlineList:", onlineList);
            return onlineList;
        }
    }
    catch (e) {
        return e;
    }
};
exports.removeFromRedis = removeFromRedis;
