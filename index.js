import dotenv from "dotenv";
import os from "os";
import app from "./components/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const PROTOCOL = "http";
const ADDRESS = os.networkInterfaces().Ethernet[1].address;

async function start() {
  try {
    app.listen(
      PORT,
      console.log(`server started on  - ${PROTOCOL}://${ADDRESS}:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
}

start();
