import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    publisher: {
      type: String,
      required: [true, "A editora é obrigatória"],
    },
    pages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O número de páginas deve ser entre 10 e 5000",
      },
      required: [true, "O número de páginas é obrigatório"],
    },
    price: {
      type: Number,
      required: [true, "O preço do livro é obrigatório"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "O autor do livro é obrigatório"],
      autopopulate: true,
    },
  },
  {
    versionKey: false,
  }
);

bookSchema.plugin(autopopulate);

export const book = mongoose.model("Book", bookSchema);
