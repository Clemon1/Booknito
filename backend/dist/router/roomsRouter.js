"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomHotelController_1 = require("../controller/roomHotelController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, "src/uploads/"),
    filename: function (req, file, callback) {
        callback(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
});
router.get("/viewrooms", roomHotelController_1.viewHome);
router.get("/viewrooms/available", roomHotelController_1.getRoomAvailability);
router.get("/viewrooms/:id", roomHotelController_1.viewSingleHome);
router.get("/search", roomHotelController_1.searchRoom);
router.post("/createRoom", upload.fields([{ name: "photos", maxCount: 5 }]), roomHotelController_1.createRoom);
router.patch("/viewrooms/:id", roomHotelController_1.updateRoom);
router.patch("/removeRooms/:id", roomHotelController_1.deleteRoom);
// router.patch("/wishlist/:id/:productId", bookmarkRentalHomes);
// router.patch("/viewrooms/:id");
exports.default = router;
