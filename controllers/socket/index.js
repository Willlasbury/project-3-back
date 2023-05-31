const useSocket = (socket) => {
    console.log("socket:", socket.id);
  
    const sayHi = require("./sayHi");
    socket.on("Hi", sayHi);

    const handleMessage = require('./handleMessage')
    socket.on("message", (data) => handleMessage(data, socket))
}

module.exports = useSocket