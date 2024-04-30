import { Schema, Types, model } from "mongoose";

interface IbookingService {
  guestName: String;
  roomId: Types.ObjectId;
  price: number;
  email: string;
  checkIN: Date;
  checkOUT: Date;
  numOfGuest: number;
  adults: number;
  children: number;
  status: string;
}

const bookingSchema = new Schema<IbookingService>(
  {
    guestName: {
      type: String,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    checkIN: {
      type: Date,
      required: true,
    },
    checkOUT: {
      type: Date,
      required: true,
    },
    numOfGuest: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      default: 1,
    },
    children: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const bookings = model("bookings", bookingSchema);
export default bookings;
