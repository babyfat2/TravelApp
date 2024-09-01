"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoto = void 0;
const init_1 = __importDefault(require("../../lib/prisma/init"));
const updatePhoto = async (req, res, next) => {
    console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.file);
    try {
        const photos = await init_1.default.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                imageUri: req.imageUri,
            },
        });
        if (photos) {
            return res.status(200).json({ msg: "Successfully Uploaded" });
        }
        return res.status(400).json({ msg: "bad request" });
    }
    catch (e) {
        next(e);
    }
};
exports.updatePhoto = updatePhoto;
