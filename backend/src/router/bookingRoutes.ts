import { Router, Request, Response } from "express";
const router = Router();
import {
  viewAllBookings,
  viewSingleBooking,
  viewUserBookings,
  createBookings,
} from "../controller/bookingController";
import { calculateUserBookingRecommendations } from "../controller/recommendation";

router.get("/viewBooking", viewAllBookings);
router.get("/viewBooking/user", viewUserBookings);
router.get(
  "/user-booking-recommendations/:userId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const numRecommendations = 5;

    try {
      const recommendations = await calculateUserBookingRecommendations(
        userId,
        numRecommendations,
      );
      res.json(recommendations);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching user booking recommendations" });
    }
  },
);
router.get("/viewAll/:id", viewSingleBooking);
router.post("/createBooking", createBookings);
export default router;
