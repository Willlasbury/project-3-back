function handleMessage (data, socket) {
    console.log("data:", data)
    socket.emit("messageResponse", data)
   }
   
   module.exports = handleMessage