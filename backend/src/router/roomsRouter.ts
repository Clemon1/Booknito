import { Router } from "express";
import {
  viewHome,
  viewSingleHome,
  viewSuggestHome,
  createRoom,
  bookmarkRentalHomes,
  searchRoom,
  updateRoom,
  deleteRoom,
} from "../controller/roomHotelController";
import multer from "multer";

import path from "path";
// import { getRecommendations } from "../controller/recommendation";
const router = Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});
router.get("/viewrooms", viewHome);
router.get("/viewrooms/:id", viewSingleHome);

router.get("/search", searchRoom);
router.get("/suggest/:userId", viewSuggestHome);
router.post(
  "/createRoom",
  upload.fields([{ name: "photos", maxCount: 5 }]),
  createRoom,
);
router.patch("/viewrooms/:id", updateRoom);
router.patch("/removeRooms/:id", deleteRoom);
// router.patch("/wishlist/:id/:productId", bookmarkRentalHomes);
// router.patch("/viewrooms/:id");

export default router;
