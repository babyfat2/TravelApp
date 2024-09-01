"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Khởi tạo Firebase Admin SDK
const serviceAccount = require("../../../travel-20421-firebase-adminsdk.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});
const createUploadFolder = (folderName) => {
    try {
        if (!fs_1.default.existsSync(folderName)) {
            fs_1.default.mkdirSync(folderName);
        }
    }
    catch (err) {
        console.error(err);
    }
};
createUploadFolder("./uploads/");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, (0, uuid_1.v4)().replaceAll("-", "") + path_1.default.extname(file.originalname));
    },
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid file type."));
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 16000000 },
    fileFilter,
});
