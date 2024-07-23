const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const PORT = 3000;
const MESSAGES = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' }
];

const app = express();
const io = socketIO(app);

function configureServer() {
    app.use(express.static(__dirname));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    setupRoutes();
}

function setupRoutes() {
    app.get('/messages', getMessages);
    app.post('/messages', postChatMessage);
}

function getMessages(req, res) {
    res.send(MESSAGES);
}

function postChatMessage(req, res) {
    MESSAGES.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
}

io.on('connection', () => {
    console.log('A user connected');
});

configureServer();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
