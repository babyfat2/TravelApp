"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePhotoUpload = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Giả sử Firebase Admin SDK đã được khởi tạo ở một nơi khác trong ứng dụng của bạn
const profilePhotoUpload = (req, res, next) => {
    const photo = req?.file;
    if (!photo) {
        return res.status(400).send("No photo uploaded.");
    }
    const filename = photo.filename.split(".")[0] + "-sm.jpg";
    const localFilePath = `./uploads/${filename}`;
    (0, sharp_1.default)(`./uploads/${photo.filename}`)
        .jpeg({ quality: 90 })
        .resize(600, 600)
        .toFile(localFilePath, async (err, info) => {
        if (err || !info) {
            console.error("Error processing image", err);
            return res.status(500).send("Error processing image");
        }
        try {
            const bucket = firebase_admin_1.default.storage().bucket(); // Assuming default bucket. Otherwise, specify bucket name.
            await bucket.upload(localFilePath, {
                destination: filename,
                metadata: {
                    contentType: "image/jpeg",
                    cacheControl: "public, max-age=31536000",
                },
            });
            // Get public URL for uploaded file
            const file = bucket.file(filename);
            const signedUrls = await file.getSignedUrl({
                action: "read",
                expires: "03-09-2491",
            });
            req.imageUri = signedUrls[0];
            (0, fs_1.unlink)(localFilePath, (err) => {
                if (err)
                    console.error("Failed to delete local file", err);
            });
            (0, fs_1.unlink)(`./uploads/${photo.filename}`, (err) => {
                if (err)
                    console.error("Failed to delete original file", err);
            });
            next();
        }
        catch (error) {
            console.error("Failed to upload to Firebase Storage", error);
            res.status(500).send("Failed to upload image");
        }
    });
};
exports.profilePhotoUpload = profilePhotoUpload;
