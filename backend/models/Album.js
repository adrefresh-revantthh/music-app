import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    coverImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Album", albumSchema);
