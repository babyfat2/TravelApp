"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const client_1 = require("@prisma/client");
const multer_1 = __importDefault(require("multer"));
const ErrorHandler = (error, req, res, next) => {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                const keyName = error.meta?.target;
                const formattedKeyName = keyName.split("_")[1];
                console.log("🚀 ~ file: HandleErrors.ts:17 ~ keyName:", keyName);
                res.status(400).json({ message: `${formattedKeyName} already exists` });
                break;
            case "P2010":
                res.status(400).json({ message: "The name is required" });
                break;
            default:
                return res.status(500).json({ message: "Something went wrong" });
        }
        return;
    }
    if (error instanceof multer_1.default.MulterError) {
        // A Multer error occurred during file upload
        return res.status(400).json({ message: "Multer Error: " + error.message });
    }
    else {
        console.log(error);
        return res.status(500).json({ msg: "internal server error" });
    }
};
exports.ErrorHandler = ErrorHandler;
