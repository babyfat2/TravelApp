"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const auth_1 = require("../../middleware/auth");
async function createUser(req, res, next) {
    const { name, email, password, userName, } = req.body;
    const formattedUserName = userName.toLowerCase();
    try {
        //check if user already exists
        const existingUser = await init_1.default.user.findFirst({
            where: {
                OR: [
                    {
                        email: email,
                    },
                    {
                        userName: formattedUserName,
                    },
                ],
            },
        });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(401).json({ msg: "Email already exists" });
            }
            else if (existingUser.userName === formattedUserName) {
                return res.status(401).json({ msg: "Username already exists" });
            }
        }
        const user = await init_1.default.user.create({
            data: {
                name,
                password: await (0, auth_1.createHashedPassword)(password),
                email,
                userName: formattedUserName,
            },
        });
        if (user) {
            return res.status(200).json({ msg: "Account created" });
        }
        return res.status(400).json({ msg: "error" });
    }
    catch (e) {
        next(e);
        // if (e?.meta?.target === "User_email_key") {
        //   return res.status(401).json({ msg: "Email exists" });
        // }
        // if (e?.meta?.target === "User_userName_key") {
        //   return res.status(401).json({ msg: "UserName exists" });
        // }
        // return res.status(400).json({ msg: e });
    }
}
exports.createUser = createUser;
