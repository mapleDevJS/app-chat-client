// Import the necessary packages
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Server as SocketIoServer } from 'socket.io';
import { createServer } from 'http';

interface ChatMessage {
    name: string;
    message: string;
}

// Define the variables for the server
const PORT: number = 3000;
const MESSAGES: ChatMessage[] = [
    { name: 'Tim', message: 'Hi' },
    { name: 'Jane', message: 'Hello' },
];
const app: express.Express = express();
const server = createServer(app); // Create a server with the app as the handler function
const io: SocketIoServer = new SocketIoServer(server); // Initialize socket.io with the http.Server instance

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
function getMessages(req: Request, res: Response): void {
    res.send(MESSAGES);
}

function postChatMessage(req: Request, res: Response): void {
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
