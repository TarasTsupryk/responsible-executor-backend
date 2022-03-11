import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

async function start() {
  try {
    app.listen(PORT, console.log(`server started on - ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
}

start();
