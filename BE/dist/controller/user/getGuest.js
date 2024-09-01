"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuest = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const getGuest = async (req, res, next) => {
    console.log('CALLING GUEST');
    const { id } = req?.query;
    try {
        const loggedInUser = await init_1.default.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                followingIDs: true,
            },
        });
        if (!loggedInUser) {
            return res.json({ error: "error" });
        }
        const isFollowed = loggedInUser.followingIDs.includes(req.query.id);
        console.log("🚀 ~ file: getGuest.ts:20 ~ getGuest ~ isFollowed:", isFollowed);
        const user = await init_1.default.user.findUnique({
            where: {
                id,
            },
            select: {
                name: true,
                followers: true,
                userName: true,
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
            const { email, userName, imageUri, emailIsVerified, name, verified, followersCount, followingCount, } = user;
            return res.status(200).send({
                data: {
                    email,
                    userName,
                    imageUri,
                    emailIsVerified,
                    verified,
                    name,
                    followersCount: followersCount?.toString(),
                    followingCount: followingCount?.toString(),
                    isFollowed,
                },
            });
        }
        res.status(404).json({ msg: "user doesnot exist" });
    }
    catch (e) {
        next(e);
    }
};
exports.getGuest = getGuest;
