import { Schema, model, Types } from "mongoose";

interface IUser {
  fullname: string;
  avartar?: string;
  email: string;
  password: string;
  phoneNumber: string;
  isDeleted: boolean;
  bookmark: [Types.ObjectId];
  role: string;
}

// Defining database schema
const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    phoneNumber: String,
    avartar: String,
    bookmark: [
      {
        type: Schema.Types.ObjectId,
        ref: "rentals",
      },
    ],
    role: {
      type: String,
      enum: [
        "Super-Admin",
        "Manager",
        "Receptionist",
        "Security",
        "Cleaner",
        "User",
      ],
      default: "Super-Admin",
    },
  },
  {
    timestamps: true,
  },
);

const users = model<IUser>("users", userSchema);

export default users;
