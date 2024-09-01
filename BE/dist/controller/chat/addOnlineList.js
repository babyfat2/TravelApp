"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToRedis = void 0;
const init_1 = __importDefault(require("../../lib/redis/init"));
const addToRedis = async (id) => {
    try {
        // Check if the ID is already in the list
        const existingIds = await init_1.default.lrange("online", 0, -1);
        if (!existingIds.includes(id)) {
            // If the ID is not in the list, add it
            const onlineUsers = await init_1.default.rpush("online", id);
            if (onlineUsers) {
                const onlineUsers = await init_1.default.lrange("online", 0, -1);
                return onlineUsers;
            }
        }
        else {
            console.log("👺👺👺👺👺 user exists");
            // If the ID is already in the list, return an error or handle it as needed
            return existingIds;
        }
    }
    catch (e) {
        return e;
    }
};
exports.addToRedis = addToRedis;
