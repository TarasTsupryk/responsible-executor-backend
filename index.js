import dotenv from "dotenv";
import app from "./components/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    app.listen(PORT, console.log(`server started on - ${PORT} port`));
  } catch (e) {
    console.log(e);
  }
}

start();
