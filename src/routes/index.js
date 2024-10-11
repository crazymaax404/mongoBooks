import express from "express";
import { booksRouter } from "./booksRoutes.js";
import { authorRouter } from "./authorsRoutes.js";

export const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  app.use(express.json(), booksRouter, authorRouter);
};
