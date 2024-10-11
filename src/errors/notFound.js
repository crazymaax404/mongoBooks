import { BaseError } from "./baseError.js";

export class NotFound extends BaseError {
  constructor(message = "Endpoint não encontrado") {
    super(message, 404);
  }
}
