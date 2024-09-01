"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const postDestination = async (req, res, next) => {
    const { id, name, description, location, } = req.body;
    // TODO: add destination
    const newDestination = await init_1.default.destination.create({
        data: {
            name,
            description,
            location,
        },
    });
    if (newDestination) {
        return res.status(200).json({ msg: "new Destination created" });
    }
    return res.status(400).json({ msg: "error" });
};
exports.postDestination = postDestination;
