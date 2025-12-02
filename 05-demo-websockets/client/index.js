import { io } from 'socket.io-client';

const socket = io("ws://localhost:3005");

console.log('Connecting to server...');

socket.on('connect', () => {
  console.log('Connected to server with id:', socket.id);

  socket.emit('chat message', "Hello from client!");

  socket.on('chat message', (msg) => {
    console.log('Message from server:', msg);
  });
});