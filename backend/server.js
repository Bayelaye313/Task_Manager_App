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

// Détection de l'environnement
const isProduction = process.env.NODE_ENV === "production";

// Configuration CORS
App.use(
  cors({
    origin: isProduction
      ? "https://task-manager-app-ruddy-mu.vercel.app"
      : "http://localhost:3000",
    credentials: true,
  })
);
// App.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true, // Allow cookies and credentials
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//     ],
//   })
// );

// preflight requests are handled
App.options("*", cors());
// Routes
App.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Node.js, Express and Socket.io API",
  });
});

App.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api v1",
  });
});
App.use("/api/v1", require("./src/routes/userRoutes"));
App.use("/api/v1", require("./src/routes/taskRoutes"));

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
