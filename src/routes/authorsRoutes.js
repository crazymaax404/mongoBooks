import express from "express";
import { AuthorController } from "../controllers/authorController.js";
import { pagination } from "../middlewares/pagination.js";

export const authorRouter = express.Router();

authorRouter.get("/authors", AuthorController.list, pagination);
authorRouter.get("/authors/:id", AuthorController.get);
authorRouter.post("/authors", AuthorController.create);
authorRouter.put("/authors/:id", AuthorController.update);
authorRouter.delete("/authors/:id", AuthorController.delete);
