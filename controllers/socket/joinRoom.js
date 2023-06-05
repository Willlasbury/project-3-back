const users = [];

function joinRoom  ({id, username, room}, socket)  {
  const user = { id, username, room };
  users.push(user);
  socket.join(user.room);
  socket.emit(
    "joined",
    `${user.username} has joined the chat`)
 
};

module.exports = joinRoom;
