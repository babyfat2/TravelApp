"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPhoto = void 0;
const env_1 = __importDefault(require("../../../config/env/"));
const postPhoto = (req, res) => {
    console.log("🚀 ~ file: postPhoto.ts:4 ~ postPhoto ~ req:", req.files);
    const url = req.protocol + "://" + req.get("host");
    if (env_1.default.stage === "production") {
        return res.send({ photo: req.files[0].location });
    }
    if (Array.isArray(req.files))
        if (req.files?.length > 0) {
            const path = [];
            for (let i in req.files) {
                path.push(`${url}/api/pic/${req.files[i].path.split("\\")[1]}`);
            }
            console.log("🚀 ~ file: index.ts:42 ~ router.post ~ path:", path);
            res.send({ photo: path[0] });
        }
        else {
            res.json({ msg: "Error in upload" });
        }
};
exports.postPhoto = postPhoto;
