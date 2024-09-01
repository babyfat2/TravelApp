"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const auth_1 = require("../../middleware/auth");
async function loginUser(req, res, next) {
    const { userName, password } = req.body;
    const formattedUserName = userName.toLowerCase();
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                userName: formattedUserName,
            },
            select: {
                password: true,
                id: true,
                emailIsVerified: true,
                email: true,
                name: true,
                verified: true,
                userName: true,
                followersCount: true,
                followingCount: true,
                imageUri: true,
            },
        });
        if (user) {
            const { email, userName, imageUri, verified, emailIsVerified, name, followersCount, id, followingCount, } = user;
            if (await (0, auth_1.compareHashedPassword)(password, user.password)) {
                const token = (0, auth_1.createJWT)({
                    userName,
                    id: user.id,
                    verified: user.emailIsVerified,
                });
                req.session.token = token;
                return res.status(200).json({
                    token,
                    data: {
                        email,
                        userName,
                        imageUri,
                        emailIsVerified,
                        name,
                        id,
                        verified,
                        followersCount: followersCount?.toString(),
                        followingCount: followingCount?.toString(),
                    },
                    msg: "login success",
                });
            }
            return res
                .status(401)
                .json({ msg: "User Name or Password is incorrect" });
        }
        return res.status(401).json({ msg: "User Name or Password is incorrect" });
    }
    catch (e) {
        next(e);
    }
}
exports.loginUser = loginUser;
