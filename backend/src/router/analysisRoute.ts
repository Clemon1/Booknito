import { Router } from "express";
import {
  getUsersReport,
  getBookingReport,
  getHotelRevenue,
} from "../controller/analysisController";
const router = Router();

router.get("/users", getUsersReport);
router.get("/booking", getBookingReport);
router.get("/revenue", getHotelRevenue);

export default router;
