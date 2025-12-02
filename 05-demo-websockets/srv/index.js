import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

const allClients = new HashMap();

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  allClients.set(socket.id, socket);

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    socket.emit('chat message', 'Hello response from server!');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    allClients.delete(socket.id);
  });
});

server.listen(3005, () => {
  console.log('server running at http://localhost:3005');
});