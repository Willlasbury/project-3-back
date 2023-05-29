const express = require('express');
const allRoutes = require('./controllers');

const sequelize = require('./config');

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
const io = new Server({
    cors: {
      origin: `http://localhost:3001`
    }
  })
  

console.log('===\n\n\ntest\n\n\n===')
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
  });

  setInterval(()=>{
    io.to('clock-room').emit('time', new Date())
},1000)
console.log('===\n\n\ntest\n\n\n===')
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