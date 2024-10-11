import { NotFound } from "../errors/notFound.js";

export const handler404 = (req, res, next) => {
  const error = new NotFound();

  next(error);
};
