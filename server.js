const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const PORT = 3000;

const messages = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' }
];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', getMessages);
app.post('/messages', postMessage);

io.on('connection', onConnection);

server.listen(PORT, () => {
    console.log('Server is listening on port', server.address().port);
});

function getMessages(req, res) {
    res.send(messages);
}

function postMessage(req, res) {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
}

function onConnection(socket) {
    console.log('A user connected');
}
