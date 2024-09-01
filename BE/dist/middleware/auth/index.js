"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVerified = exports.blockJWT = exports.protect = exports.createEmailJWT = exports.createJWT = exports.compareHashedPassword = exports.createHashedPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createHashedPassword = (password) => {
    return bcrypt_1.default.hash(password, 5);
};
exports.createHashedPassword = createHashedPassword;
const compareHashedPassword = (password, hashPassword) => {
    return bcrypt_1.default.compare(password, hashPassword);
};
exports.compareHashedPassword = compareHashedPassword;
const createJWT = (user) => {
    const token = jsonwebtoken_1.default.sign({ email: user.userName, id: user.id, verified: user.verified }, process.env.SECRET || "");
    return token;
};
exports.createJWT = createJWT;
const createEmailJWT = (email) => {
    const token = jsonwebtoken_1.default.sign({ email }, process.env.SECRET || "", { expiresIn: "1h" });
    return token;
};
exports.createEmailJWT = createEmailJWT;
const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        return res.status(401).json({ msg: "invalid token" });
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.SECRET || "");
        req.user = user;
        req.token = token;
        next();
    }
    catch (e) {
        console.error(e);
        return res.status(401).json({ msg: "invalid token" });
    }
};
exports.protect = protect;
const blockJWT = async (req, res, next) => {
    const bearer = req.headers.authorization;
    console.log(bearer);
    const tokenFromSession = req.session.token;
    console.log("🚀 ~ file: index.ts:68 ~ blockJWT ~ tokenFromSession:", tokenFromSession);
    if (!tokenFromSession) {
        return res.status(401).json({ msg: "Session Expired" });
    }
    if (!bearer) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const [, token] = bearer.split(" ");
    if (!token) {
        return res.status(401).json({ msg: "invalid token" });
    }
    if (token !== tokenFromSession) {
        return res.status(401).json({ msg: "invalid token" });
    }
    next();
};
exports.blockJWT = blockJWT;
const checkVerified = async (req, res, next) => {
    const { verified } = req.user;
    if (verified) {
        next();
    }
    else {
        return res.status(401).json({ msg: "User not verified" });
    }
};
exports.checkVerified = checkVerified;
