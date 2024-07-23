# App-chat

## Description
App-chat is a real-time chat application built using Node.js, Express, and Socket.io.

## Version
3.0.0

## Main file
The main server file is 'server.ts'.

## Author
This application has been developed by Alexey Ivanov.

## License
ISC

## Scripts

* `start`: To start the application, execute `npm run prestart && node ./dist/server.js`.
* `prestart`: This script is for cleaning the 'dist' folder, rebuilding the project, and copying the index.html to 'dist'. To execute it, use `rm -rf ./dist && npm run build && cp index.html dist`.
* `build`: It compiles TypeScript to JavaScript using tsc.
* `dev`: This script is for starting the application in development mode. To execute it, use `nodemon --watch 'src/**/*.ts' --exec ts-node server.ts`.

## Keywords

1. Chat
2. socket.io
3. Express
4. Real-time

## Dependencies

* body-parser: 1.20.2
* express: 4.17.1
* socket.io: 4.7.5

## DevDependencies

* @types/express: 4.17.21
* @types/node: 20.14.11
* nodemon: 3.1.4
* ts-node: 10.9.2
* typescript: 5.5.4

## Node Engine
This application requires node version >=20.15.1.
