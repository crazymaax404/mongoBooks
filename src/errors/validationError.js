import { IncorrectRequest } from "./incorrectRequest.js";

export class ValidationError extends IncorrectRequest {
  constructor(error) {
    const message = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Houve um erro: ${message}`, 400);
  }
}
