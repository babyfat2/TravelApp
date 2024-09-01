"use strict";
// src/routes/destination.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getAllDestination_1 = require("../../controller/services/destination/getAllDestination");
const addDestination_1 = require("../../controller/services/destination/addDestination");
const getSingleDestination_1 = require("../../controller/services/destination/getSingleDestination");
const likeDestination_1 = require("../../controller/services/destination/likeDestination");
const postCommentDestination_1 = require("../../controller/services/destination/postCommentDestination");
const getDestinationFavoriteByUser_1 = require("../../controller/services/destination/getDestinationFavoriteByUser");
const getAllCommentDestination_1 = require("../../controller/services/destination/getAllCommentDestination");
const searchDestination_1 = require("../../controller/services/destination/searchDestination");
const router = express_1.default.Router();
router.post("/add-destination", addDestination_1.addDestination);
router.get("/all-destination", getAllDestination_1.getAllDestination);
router.get("/single-destination", getSingleDestination_1.getSingleDestination);
router.post("/like-destination", likeDestination_1.likeDestination);
router.get("/all-comment-destination", getAllCommentDestination_1.getAllCommentDestination);
router.post("/comment-destination", postCommentDestination_1.postCommentDestination);
router.get("/destination-like-by-user", getDestinationFavoriteByUser_1.getDestinationLikeByUser);
router.get("/search-destination", searchDestination_1.getSearchDestination);
exports.default = router;
