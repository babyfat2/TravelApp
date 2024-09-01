"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineList = void 0;
const init_1 = __importDefault(require("../../lib/redis/init"));
const getOnlineList = async () => {
    try {
        const onlineUsers = await init_1.default.lrange("online", 0, -1);
        return onlineUsers;
    }
    catch (e) {
        return e;
    }
};
exports.getOnlineList = getOnlineList;
