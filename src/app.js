import express from "express";
import { connect } from "./config/dbConnect.js";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errors.js";
import { handler404 } from "./middlewares/handler404.js";

const connection = await connect();

connection.on("error", (error) => console.error(error));
connection.once("open", () => console.log("Conectado ao MongoDB"));

const app = express();
routes(app);

app.use(handler404);

app.use(errorHandler);

export default app;
