import { Router } from "express";
import {
  getUsersReport,
  getBookingReport,
} from "../controller/analysisController";
const router = Router();

router.get("/users", getUsersReport);
router.get("/booking", getBookingReport);

export default router;
