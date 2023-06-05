const getTokenInfo = require("../utils/getTokenInfo");
const { Message } = require("../../models");

const messages = [];
async function handleMessage (data, io) {
  const senderInfo = getTokenInfo(data.token);

  const newMessage = {
    text: data.text,  
  }

  const message = await Message.create(newMessage)
  message.setSender(senderInfo.userId)

  io.emit("messageResponse", data);
  
}

module.exports = handleMessage;
