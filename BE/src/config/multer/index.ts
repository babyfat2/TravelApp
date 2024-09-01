import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Khởi tạo Firebase Admin SDK
const serviceAccount = require("../../../travel-20421-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const createUploadFolder = (folderName: string) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
};
createUploadFolder("./uploads/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
  },
});

const fileFilter = function (
  req: any,
  file: Express.Multer.File,
  cb: Function
) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 16000000 },
  fileFilter,
});
