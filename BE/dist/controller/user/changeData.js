"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeData = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const auth_1 = require("../../middleware/auth");
const changeData = async (req, res, next) => {
    try {
        //@ts-ignore
        const { id } = req.user;
        const { password, userName, newPassword, name } = req.body;
        const user = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                password: true,
            },
        });
        if (user) {
            if (await (0, auth_1.compareHashedPassword)(password, user.password)) {
                const updatedUser = await init_1.default.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        name: name || undefined,
                        password: newPassword
                            ? await (0, auth_1.createHashedPassword)(newPassword)
                            : undefined,
                        userName: userName ? userName.trim() : undefined,
                    },
                });
                if (updatedUser) {
                    return res.status(200).json({ msg: "success" });
                }
            }
            return res.status(401).json({ msg: "Invalid password" });
        }
    }
    catch (e) {
        return next(e);
    }
};
exports.changeData = changeData;
