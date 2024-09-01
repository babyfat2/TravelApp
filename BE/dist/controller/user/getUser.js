"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getUser = async (req, res, next) => {
    const { id } = req?.user;
    try {
        const user = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                followers: true,
                userName: true,
                id: true,
                followersCount: true,
                followingCount: true,
                email: true,
                following: true,
                verified: true,
                imageUri: true,
                emailIsVerified: true,
            },
        });
        if (user) {
            const { email, userName, imageUri, emailIsVerified, name, id, verified, followersCount, followingCount, } = user;
            return res.status(200).send({
                data: {
                    email,
                    userName,
                    imageUri,
                    emailIsVerified,
                    verified,
                    name,
                    id,
                    followersCount: followersCount?.toString(),
                    followingCount: followingCount?.toString(),
                },
            });
        }
        res.status(404).json({ msg: "user does not exist" });
    }
    catch (e) {
        next(e);
    }
};
exports.getUser = getUser;
