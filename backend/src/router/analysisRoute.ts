import { Router } from "express";
import {
  getUsersReport,
  getBookingReport,
  getHotelRevenue,
  getRoomPerformance,
} from "../controller/analysisController";
const router = Router();

router.get("/users", getUsersReport);
router.get("/booking", getBookingReport);
router.get("/revenue", getHotelRevenue);
router.get("/roomPerformance", getRoomPerformance);

export default router;
