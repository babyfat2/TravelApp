// src/routes/destination.ts

import express from "express";
import { getAllDestination } from "../../controller/services/destination/getAllDestination";
import { addDestination } from "../../controller/services/destination/addDestination";
import { getSingleDestination } from "../../controller/services/destination/getSingleDestination";
import { likeDestination } from "../../controller/services/destination/likeDestination";
import { postCommentDestination } from "../../controller/services/destination/postCommentDestination";
import { getDestinationLikeByUser } from "../../controller/services/destination/getDestinationFavoriteByUser";
import { getAllCommentDestination } from "../../controller/services/destination/getAllCommentDestination";
import { getSearchDestination } from "../../controller/services/destination/searchDestination";
import { searchValidator } from "../../middleware/validation/inputValidation";
import { handleErrors } from "../../middleware/validation/handleErrors";

const router = express.Router();

router.post("/add-destination", addDestination);
router.get("/all-destination", getAllDestination);
router.get("/single-destination", getSingleDestination);
router.post("/like-destination", likeDestination);
router.get("/all-comment-destination",getAllCommentDestination);
router.post("/comment-destination", postCommentDestination);
router.get("/destination-like-by-user", getDestinationLikeByUser);
router.get("/search-destination", getSearchDestination);

export default router;
