const datas = [];
function handleMessage(data, io) {
  io.emit("messageResponse", data);
  datas.push(data);
}

module.exports = handleMessage;
