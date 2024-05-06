import { Router } from "express";
const router = Router();
import {
  viewAllBookings,
  viewSingleBooking,
  viewUserBookings,
  createBookings,
} from "../controller/bookingController";

router.get("/viewBooking", viewAllBookings);
router.get("/viewBooking/user", viewUserBookings);
router.get("/viewAll/:id", viewSingleBooking);
router.post("/createBooking", createBookings);
export default router;
