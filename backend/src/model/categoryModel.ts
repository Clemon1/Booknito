import { Schema, model } from "mongoose";

interface ICartegory {
  name: string;
  image?: string;
}

const categorySchema = new Schema<ICartegory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const categories = model<ICartegory>("categories", categorySchema);

export default categories;
