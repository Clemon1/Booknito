import { Schema, model, Types } from "mongoose";

interface IRentalService {
  roomNumber: string;
  description: string;
  photos?: Array<string>;
  perks: Array<string>;
  roomType: string;
  price: number;
  bookedDates: [];
  maxGuest: number;
  isDeleted: boolean;
}

const roomSchema = new Schema<IRentalService>(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    perks: [
      {
        type: String,
      },
    ],
    roomType: {
      type: String,
      enum: [
        "Standard Room",
        "Deluxe Room",
        "Executive Room",
        "Junior Suite",
        "Suite",
        "Presidential Suite",
        "Penthouse Suite",
      ],
      default: "Standard Room",
    },
    photos: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    maxGuest: {
      type: Number,
      default: 1,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const rooms = model<IRentalService>("rooms", roomSchema);
export default rooms;
