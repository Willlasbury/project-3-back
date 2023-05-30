const useSocket = (socket) => {
    console.log("socket:", socket.id);
  
    const sayHi = require("./sayHi");
    socket.on("Hi", sayHi);

    socket.on('do-math', () => {
        console.log(1+1)
    })
}

module.exports = useSocket