"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({
    storage,
});
router.get("/admin/allUsers", authController_1.getAllUsers);
router.get("/admin/allUser/:id", authController_1.getSingleUser);
router.post("/admin/register", upload.single("photo"), authController_1.adminRegister);
router.post("/admin/login", authController_1.adminLogin);
router.post("/staff/register", upload.single("photo"), authController_1.StaffRegister);
router.post("/staff/login", authController_1.staffLogin);
exports.default = router;
