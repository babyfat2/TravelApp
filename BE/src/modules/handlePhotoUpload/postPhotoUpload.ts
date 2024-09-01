import { NextFunction, Request, Response } from "express";
import imageSize from "image-size";
import { readFileSync, unlink } from "fs";
import admin from "firebase-admin";

export const postPhotoUpload = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const photo = req?.file;
  console.log("🚀 ~ file: postPhotoUpload.ts:13 ~ photo:", photo);
  if (!photo) {
    return res.status(400).json({ msg: "upload failed" });
  }
  imageSize(`./uploads/${photo?.filename}`, async (err, dimensions) => {
    const filetoUpload = readFileSync(`./uploads/${photo?.filename}`);
    console.log(
      "🚀 ~ file: profilePhotoUpload.ts:24 ~ filetoUpload:",
      filetoUpload
    );

    // Tạo một tham chiếu đến bucket và đường dẫn file trên Firebase
    const bucket = admin.storage().bucket();
    const file = bucket.file(`uploads/${photo?.filename}`);

    try {
      // Tải file lên Firebase
      await file.save(filetoUpload, {
        metadata: {
          contentType: "image/jpeg",
        },
      });

      // Xóa file tạm sau khi tải lên thành công
      unlink(`./uploads/${photo?.filename}`, (err) => {
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

      console.log(
        "🚀 ~ file: postPhotoUpload.ts:48 ~ imageSize ~ image:",
        image
      );
      return res.json({ photo: image });
    } catch (error) {
      console.error("Upload to Firebase failed:", error);
      return res.status(500).json({ msg: "upload failed" });
    }
  });
};
