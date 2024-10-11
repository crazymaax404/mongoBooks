/* eslint-disable no-undef */
import mongoose from "mongoose";

export async function connect() {
  mongoose.connect(process.env.DB_CONNECTION);
  return mongoose.connection;
}
