import { Router } from "express";
import {
  adminRegister,
  adminLogin,
  staffLogin,
  StaffRegister,
  getAllUsers,
  getSingleUser,
} from "../controller/authController";
import multer from "multer";
import path from "path";
const router = Router();
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});
router.get("/admin/allUsers", getAllUsers);
router.get("/admin/allUser/:id", getSingleUser);
router.post("/admin/register", upload.single("photo"), adminRegister);
router.post("/admin/login", adminLogin);
router.post("/staff/register", upload.single("photo"), StaffRegister);
router.post("/staff/login", staffLogin);

export default router;
