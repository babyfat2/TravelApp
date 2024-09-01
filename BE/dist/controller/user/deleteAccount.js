"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const auth_1 = require("../../middleware/auth");
const deleteAccount = async (req, res, next) => {
    try {
        const { password } = req.body;
        const userAccount = await init_1.default.user.findUnique({
            where: {
                //@ts-ignore
                id: req.user.id,
            },
            select: {
                password: true,
            },
        });
        if (!(await (0, auth_1.compareHashedPassword)(password, userAccount?.password))) {
            return res.status(401).json({ msg: "invalid password" });
        }
        const user = await init_1.default.user.delete({
            where: {
                //@ts-ignore
                id: req.user.id,
            },
        });
        if (user) {
            res.json({ msg: "done" });
        }
    }
    catch (e) {
        next(e);
    }
};
exports.deleteAccount = deleteAccount;
