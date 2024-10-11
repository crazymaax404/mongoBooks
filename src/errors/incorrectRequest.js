import { BaseError } from "./baseError.js";

export class IncorrectRequest extends BaseError {
  constructor(message = "Dados inválidos") {
    super(message, 400);
  }
}
