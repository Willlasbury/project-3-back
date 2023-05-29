const express = require("express");
const allRoutes = require("./controllers");

const sequelize = require("./config/sequelize");

// allow cross-origin resource sharing (CORS)
const cors = require("cors");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;
// =============================================================

// set up socket.io

const socket = require("./config/socket");
const { io, server } = socket(app);

io.on("connection", (socket) => {
  console.log("socket:", socket.id);

  const sayHi = require("./controllers/socket/sayHi");
  socket.on("Hi", sayHi);
});

// =============================================================

// Requiring our models for syncing
const { User, belongsTo } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// link in routes
app.use("/", allRoutes);

// start the server
sequelize.sync({ force: false }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
