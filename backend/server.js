const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDb = require("./src/bd/bd");
const { handleError } = require("./src/middleware/handleError");
const port = process.env.PORT || 5000;
const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
App.use("/api/V1", require("./src/routes/userRoutes"));
App.use(handleError);

const server = async () => {
  try {
    await connectDb();

    App.listen(port, () => console.log(`server started on port ${port}`));
  } catch (error) {
    console.log("server failed ", error.message);
  }
};

server();
