"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDestination = void 0;
const init_1 = __importDefault(require("../../../lib/prisma/init"));
const addDestination = async (req, res, next) => {
    const { name, description, location } = req.body;
    try {
        const getAllDestination = await init_1.default.destination.create({
            data: {
                name: name,
                description: description,
                location: location,
            }
        });
        console.log("Create Destination seccess");
        res.json(getAllDestination);
    }
    catch (e) {
        next(e);
    }
};
exports.addDestination = addDestination;
