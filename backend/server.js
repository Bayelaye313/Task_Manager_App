const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDb = require("./src/bd/bd");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { handleError } = require("./src/middleware/handleError");

const port = process.env.PORT || 5001;
const App = express();

// Middleware pour parser le JSON
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());
App.use(morgan("dev"));

// Middleware pour gérer CORS
App.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
App.use("/api/V1", require("./src/routes/userRoutes"));
App.use("/api/V1", require("./src/routes/taskRoutes"));

// Gestionnaire d'erreurs
App.use(handleError);

// Fonction principale pour démarrer le serveur
const server = async () => {
  try {
    await connectDb();

    App.listen(port, () =>
      console.log(`✅ Server started on port ${port}`.green.bold)
    );
  } catch (error) {
    console.error(`❌ Server failed: ${error.message}`.red.bold);
  }
};

server();
