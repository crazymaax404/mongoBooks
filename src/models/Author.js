import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "O nome do autor é obrigatório"],
    },
    nacionality: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const author = mongoose.model("Author", authorSchema);
