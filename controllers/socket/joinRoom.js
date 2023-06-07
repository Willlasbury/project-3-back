const users = [];

function joinRoom  ({id, userName, room}, socket)  {
  const user = { id, userName, room };
  users.push(user);
  socket.join(user.room);
  socket.emit(
    "joined",
    `${user.userName} has joined the chat`)
 
};

module.exports = joinRoom;
