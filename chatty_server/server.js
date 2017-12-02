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
const users = new Set();

// Create an array of colors
// https://material.io/guidelines/style/color.html#color-color-palette
const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B',
  '#000000'
];

function sendNewUser(user) {
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

  users.add(user.id);
  sendNewUser(user);
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
    users.delete(user.id)
    broadcastUserCount();
  });
});
