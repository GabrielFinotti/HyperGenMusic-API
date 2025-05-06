import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use("/api");

async function startServer() {
  try {
  } catch (error) {}
}

startServer();
