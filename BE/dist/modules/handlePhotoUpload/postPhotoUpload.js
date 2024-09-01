"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPhotoUpload = void 0;
const image_size_1 = __importDefault(require("image-size"));
const fs_1 = require("fs");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const postPhotoUpload = (req, res, next) => {
    const photo = req?.file;
    console.log("🚀 ~ file: postPhotoUpload.ts:13 ~ photo:", photo);
    if (!photo) {
        return res.status(400).json({ msg: "upload failed" });
    }
    (0, image_size_1.default)(`./uploads/${photo?.filename}`, async (err, dimensions) => {
        const filetoUpload = (0, fs_1.readFileSync)(`./uploads/${photo?.filename}`);
        console.log("🚀 ~ file: profilePhotoUpload.ts:24 ~ filetoUpload:", filetoUpload);
        // Tạo một tham chiếu đến bucket và đường dẫn file trên Firebase
        const bucket = firebase_admin_1.default.storage().bucket();
        const file = bucket.file(`uploads/${photo?.filename}`);
        try {
            // Tải file lên Firebase
            await file.save(filetoUpload, {
                metadata: {
                    contentType: "image/jpeg",
                },
            });
            // Xóa file tạm sau khi tải lên thành công
            (0, fs_1.unlink)(`./uploads/${photo?.filename}`, (err) => {
                if (err) {
                    console.log("failed to delete local file");
                }
            });
            // Lấy URL công khai của file
            const signedUrls = await file.getSignedUrl({
                action: "read",
                expires: "03-09-2491",
            });
            const image = {
                uri: signedUrls[0],
                width: dimensions?.width,
                height: dimensions?.height,
            };
            console.log("🚀 ~ file: postPhotoUpload.ts:48 ~ imageSize ~ image:", image);
            return res.json({ photo: image });
        }
        catch (error) {
            console.error("Upload to Firebase failed:", error);
            return res.status(500).json({ msg: "upload failed" });
        }
    });
};
exports.postPhotoUpload = postPhotoUpload;
