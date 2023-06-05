const messages = [];
function handleMessage(data, io) {
  io.emit("messageResponse", data);
  messages.push(data);
  console.log("messages:", messages)
}

module.exports = handleMessage;
