import * as dotenv from "dotenv";
dotenv.config();
import { v2 } from "cloudinary";

const cloudinary = v2;
// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_Cloud_Name,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
