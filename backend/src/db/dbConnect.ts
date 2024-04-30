import mongoose from "mongoose";

// MongoDB Database configuration
export const dbConnect = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(`${url}`);
    console.log("Connected to DB");
  } catch (err: any) {
    console.log("Error connecting to Database");
    console.log(err.message);
  }
};
