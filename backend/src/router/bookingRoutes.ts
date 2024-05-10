import { Router } from "express";
const router = Router();
import {
  viewAllBookings,
  viewSingleBooking,
  viewUserBookings,
  createBookings,
  getTotalRevenue,
  updateBookings,
} from "../controller/bookingController";

router.get("/viewBooking", viewAllBookings);
router.get("/revenue", getTotalRevenue);
router.get("/viewBooking/user", viewUserBookings);
router.get("/viewBooking/:id", viewSingleBooking);
router.post("/createBooking", createBookings);
router.patch("/updateBooking/:id", updateBookings);
export default router;
