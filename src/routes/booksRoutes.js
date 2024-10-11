import express from "express";
import { BookController } from "../controllers/bookController.js";
import { pagination } from "../middlewares/pagination.js";

export const booksRouter = express.Router();

booksRouter.get("/books", BookController.list, pagination);
booksRouter.get("/books/search", BookController.listByFilter, pagination);
booksRouter.get("/books/:id", BookController.get);
booksRouter.post("/books", BookController.create);
booksRouter.put("/books/:id", BookController.update);
booksRouter.delete("/books/:id", BookController.delete);
