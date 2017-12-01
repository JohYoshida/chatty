const express = require('express');
const uuid = require('uuid/v1')
const ws = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new ws.Server({ server });

// Create an array for holding users
const users = [];

// Create an array of colors
const colors = [
  '#B71C1C',
  '#1A237E',
  '#1B5E20',
  '#F57F17'
];

function sendNewUser() {
  const user = users[users.length - 1];
  const message = {
    type: 'incomingNewUser',
    userColor: user.color,
    userId: user.id
  }
  user.socket.send(JSON.stringify(message));
}

function broadcastUserCount() {
  const message = {
    type: 'incomingUserCount',
    userCount: wss.clients.size.toString()
  }
  wss.broadcast(JSON.stringify(message));
}

function assignColor() {
  return colors[Math.floor(Math.random() * (colors.length))];
}

// broadcast to all clients
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const user = {
    socket: ws,
    id: uuid(),
    color: assignColor()
  }

  users.push(user);
  sendNewUser();
  broadcastUserCount();

  ws.on('message', (message) => {
    // parse message, add UUID, and broadcast
    message = JSON.parse(message)
    message.id = uuid();
    switch (message.type) {
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
      default:
        throw new Error('Unknown event type ' + message.type);
    }
    wss.broadcast(JSON.stringify(message));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    users.pop();
    broadcastUserCount();
  });
});
