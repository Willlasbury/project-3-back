const express = require("express");
const allRoutes = require("./controllers");

const sequelize = require("./config/sequelize");

// allow cross-origin resource sharing (CORS)
const cors = require("cors");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
// =============================================================

// set up socket.io

// import the config file to set up socket
const socket = require("./config/socket");
const { io, server } = socket(app);

// the useSocket function holds all responses for the server
const useSocket = require("./controllers/socket");
io.on("connection", (socket) => useSocket(io, socket));

// =============================================================

// Requiring our models for syncing
const { User } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// link in routes
app.use("/", allRoutes);

// start the server
sequelize.sync({ force: true }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
