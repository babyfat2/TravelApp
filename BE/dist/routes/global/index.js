"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const rootDir = path_1.default.resolve(__dirname, "../../../");
console.log("🚀 ~ file: index.ts:6 ~ rootDir:", rootDir);
router.get("/", (req, res) => {
    res.status(200).json({
        msg: "server is up",
    });
});
router.get("/pic/:id", (req, res) => {
    const { id } = req.params;
    const { d } = req.query;
    if (fs_1.default.existsSync(path_1.default.join(rootDir, "/uploads/", `${id}`))) {
        if (d) {
            return res.download(path_1.default.join(rootDir, "/uploads/", `${id}`));
        }
        return res.sendFile(path_1.default.join(rootDir, "/uploads/", `${id}`));
    }
    return res.sendFile(path_1.default.join(rootDir, "/uploads/", `nopic.png`));
});
exports.default = router;
