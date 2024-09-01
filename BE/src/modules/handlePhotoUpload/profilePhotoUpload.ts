import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { readFileSync, unlink } from "fs";
import admin from "firebase-admin";

// Giả sử Firebase Admin SDK đã được khởi tạo ở một nơi khác trong ứng dụng của bạn

export const profilePhotoUpload = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const photo = req?.file;
  if (!photo) {
    return res.status(400).send("No photo uploaded.");
  }

  const filename = photo.filename.split(".")[0] + "-sm.jpg";
  const localFilePath = `./uploads/${filename}`;

  sharp(`./uploads/${photo.filename}`)
    .jpeg({ quality: 90 })
    .resize(600, 600)
    .toFile(localFilePath, async (err, info) => {
      if (err || !info) {
        console.error("Error processing image", err);
        return res.status(500).send("Error processing image");
      }

      try {
        const bucket = admin.storage().bucket(); // Assuming default bucket. Otherwise, specify bucket name.
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
        unlink(localFilePath, (err) => {
          if (err) console.error("Failed to delete local file", err);
        });
        unlink(`./uploads/${photo.filename}`, (err) => {
          if (err) console.error("Failed to delete original file", err);
        });

        next();
      } catch (error) {
        console.error("Failed to upload to Firebase Storage", error);
        res.status(500).send("Failed to upload image");
      }
    });
};
