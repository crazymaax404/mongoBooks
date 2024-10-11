import "dotenv/config";
import app from "./src/app.js";

app.listen(3001, () => console.log("Server started on port 3001"));
