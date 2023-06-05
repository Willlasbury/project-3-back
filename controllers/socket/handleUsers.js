const getTokenInfo = require("../utils/getTokenInfo");

const users = {};

async function handleUsers(data, io) {
  const userInfo = getTokenInfo(data.token);
  users[userInfo.userId] = data.socket;
}

module.exports = handleUsers, users;
