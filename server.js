// Import the necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');

// Define the variables for the server
const PORT = 3000;
const MESSAGES = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' }
];
const app = express();
const server = http.createServer(app); // Create a server with the app as the handler function
const io = socketIO(server); // Initialize socket.io with the http.Server instance

// Configure the server
function configureServer() {
    app.use(express.static(__dirname));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    setupRoutes();
}

// Define the routes
function setupRoutes() {
    app.get('/messages', getMessages);
    app.post('/messages', postChatMessage);
}

// Define the route handlers
function getMessages(req, res) {
    res.send(MESSAGES);
}

function postChatMessage(req, res) {
    MESSAGES.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
}

// Start the socket.io server
io.on('connection', () => {
    console.log('A user connected');
});

// Configure and start the server
configureServer();
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
