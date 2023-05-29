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
// const http = require("http");
// const server = http.createServer(app);
const socket = require("./config/socket");
const { io, server } = socket(app);

io.on("connection", (socket) => {
  // when a user connects
  console.log("socket:", socket.id);

  const sayHi = require("./controllers/socket/sayHi");
  socket.on("Hi", sayHi);
});

// =============================================================

// Requiring our models for syncing
const { User, belongsTo } = require("./models");
const { log } = require("console");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function () {
  server.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
