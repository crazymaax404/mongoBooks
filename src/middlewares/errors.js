/* eslint-disable no-unused-vars */
import mongoose from "mongoose";
import { BaseError } from "../errors/baseError.js";
import { IncorrectRequest } from "../errors/incorrectRequest.js";
import { ValidationError } from "../errors/validationError.js";
import { NotFound } from "../errors/notFound.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new IncorrectRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ValidationError(error).sendResponse(res);
  } else if (error instanceof NotFound) {
    new NotFound(error.message).sendResponse(res);
  } else {
    new BaseError(error.message, 400).sendResponse(res);
  }
};
