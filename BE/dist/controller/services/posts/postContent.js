"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContent = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const validator_1 = __importDefault(require("validator"));
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const init_2 = __importDefault(require("../../../lib/expo/init"));
const forPosts_1 = require("../../../modules/handleNotifications/forPosts");
const postContent = async (req, res, next) => {
    const { id } = req?.user;
    const { photoUri, postText, photo, } = req.body;
    console.log("body🚀", req.body);
    if (postText && validator_1.default.isURL(postText) === true) {
        console.log("reached after false");
        try {
            const options = { url: postText };
            const data = await (0, open_graph_scraper_1.default)(options);
            if (data) {
                const { error, html, result, response } = data;
                if (result) {
                    console.log("🚀 ~ file: postContent.ts:60 ~ result:", result);
                    //@ts-ignore
                    const results = result.ogImage
                        ? result?.ogImage?.length >= 1
                            ? result?.ogImage[0]
                            : undefined
                        : undefined;
                    const title = result?.ogTitle;
                    console.log("reached here after");
                    const post = await init_1.default.post.create({
                        data: {
                            user: {
                                connect: {
                                    id,
                                },
                            },
                            postText,
                            link: {
                                create: {
                                    imageHeight: results?.height
                                        ? Number(results?.height)
                                        : undefined,
                                    imageWidth: results?.width
                                        ? Number(results?.width)
                                        : undefined,
                                    imageUri: results?.url ? results?.url : undefined,
                                    url: postText,
                                    title,
                                },
                            },
                        },
                    });
                    if (post) {
                        const signedInUser = await init_1.default.user.findUnique({
                            where: { id },
                            select: {
                                userName: true,
                                followers: { select: { notificationId: true } },
                            },
                        });
                        for (let i in signedInUser?.followers) {
                            init_2.default.sendPushNotificationsAsync([
                                {
                                    to: signedInUser?.followers[Number(i)]
                                        .notificationId,
                                    sound: "default",
                                    badge: 1,
                                    mutableContent: true,
                                    title: `@${signedInUser.userName}`,
                                    body: `just posted`,
                                    categoryId: "post",
                                    data: {
                                        postId: post.id,
                                        url: `qui-ojo://posts/${post.id}`,
                                    },
                                },
                            ]);
                        }
                        return res.json({ msg: "posted" });
                    }
                }
                if (error) {
                    console.log(error);
                    const post = await init_1.default.post.create({
                        data: {
                            user: {
                                connect: {
                                    id,
                                },
                            },
                            photoUri,
                            postText,
                        },
                    });
                    if (post) {
                        const signedInUser = await init_1.default.user.findUnique({
                            where: { id },
                            select: {
                                userName: true,
                                followers: { select: { notificationId: true } },
                            },
                        });
                        for (let i in signedInUser?.followers) {
                            init_2.default.sendPushNotificationsAsync([
                                {
                                    to: signedInUser?.followers[Number(i)]
                                        .notificationId,
                                    sound: "default",
                                    badge: 1,
                                    mutableContent: true,
                                    title: `@${signedInUser.userName}`,
                                    body: `just posted`,
                                    categoryId: "post",
                                    data: {
                                        postId: post.id,
                                        url: `qui-ojo://posts/${post.id}`,
                                    },
                                },
                            ]);
                        }
                        return res.json({ msg: "posted" });
                    }
                }
            }
        }
        catch (e) { }
    }
    else {
        try {
            console.log("reached");
            const post = await init_1.default.post.create({
                data: {
                    user: {
                        connect: {
                            id,
                        },
                    },
                    photoUri,
                    photo: photo?.height && photo?.uri && photo?.width
                        ? {
                            create: {
                                imageHeight: photo.height,
                                imageUri: photo.uri,
                                imageWidth: photo.width,
                            },
                        }
                        : undefined,
                    postText,
                },
            });
            if (post) {
                const signedInUser = await init_1.default.user.findUnique({
                    where: { id },
                    select: {
                        userName: true,
                        imageUri: true,
                        followers: { select: { notificationId: true, id: true } },
                    },
                });
                for (let i in signedInUser?.followers) {
                    init_2.default.sendPushNotificationsAsync([
                        {
                            to: signedInUser?.followers[Number(i)].notificationId,
                            sound: "default",
                            badge: 1,
                            mutableContent: true,
                            title: `@${signedInUser.userName}`,
                            body: `just posted`,
                            categoryId: "post",
                            data: {
                                postId: post.id,
                                url: `qui-ojo://posts/${post.id}`,
                            },
                        },
                    ]);
                }
                (0, forPosts_1.handleNotificationsForPosts)(post.postText ? post?.postText : "New Media content", id, signedInUser?.imageUri, signedInUser?.followers, post.id).then((e) => {
                    console.log(e);
                });
                return res.json({ msg: "posted" });
            }
        }
        catch (e) {
            next(e);
        }
    }
};
exports.postContent = postContent;
