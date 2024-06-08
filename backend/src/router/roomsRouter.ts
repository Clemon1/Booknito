import { Router } from "express";
import {
  viewHome,
  viewSingleHome,
  createRoom,
  bookmarkRentalHomes,
  searchRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
} from "../controller/roomHotelController";
import multer from "multer";

import path from "path";
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});
router.get("/viewrooms", viewHome);
router.get("/viewrooms/available", getRoomAvailability);
router.get("/viewrooms/:id", viewSingleHome);

router.get("/search", searchRoom);
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
