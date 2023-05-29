const express = require('express');
const allRoutes = require('./controllers');

const sequelize = require('./config/sequelize');

// allow cross-origin resource sharing (CORS)
const cors = require("cors")

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;
// =============================================================

// set up socket.io
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")

const io = new Server(server, {
    cors: {
      origin: `http://localhost:3001`
    }
  })

// =============================================================




// Requiring our models for syncing
const { User} = require('./models');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use('/',allRoutes);


sequelize.sync({ force: false }).then(function() {
    server.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});