import { Schema, Types, model, Document } from "mongoose";

interface IbookingService extends Document {
  guestName: string;
  roomId: Types.ObjectId;
  price: number;
  email: string;
  discountAmount: number;
  refundAmount: number;
  checkIN: Date;
  checkOUT: Date;
  totalAmount: number;
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
    discountAmount: {
      type: Number,
      default: 0,
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
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
//Calculate the main total
bookingSchema.pre<IbookingService>("save", function (next) {
  this.totalAmount = this.price - this.discountAmount - this.refundAmount;
  next();
});
const bookings = model("bookings", bookingSchema);
export default bookings;
