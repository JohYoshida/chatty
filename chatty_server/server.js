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

// broadcast to all clients
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      console.log("Client's websocket is open");
      client.send(data);
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // parse message, add UUID, and broadcast
    message = JSON.parse(message)
    message.id = uuid();
    wss.broadcast(JSON.stringify(message));

    console.log(`${message.username} says ${message.content}`);
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
