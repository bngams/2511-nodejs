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

// Store clients with their usernames
const clients = new Map(); // socketId -> { username, socketId }
const rooms = new Map(); // roomName -> Set of socketIds

// Helper to get list of connected usernames
const getConnectedUsers = () => {
  return Array.from(clients.values()).map(client => client.username);
};

// Helper to get users in a room
const getRoomUsers = (roomName) => {
  const room = rooms.get(roomName);
  if (!room) return [];
  return Array.from(room).map(socketId => clients.get(socketId)?.username).filter(Boolean);
};

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Handle user registration (username)
  socket.on('register', (username) => {
    clients.set(socket.id, { username, socketId: socket.id });
    console.log(`User registered: ${username} (${socket.id})`);

    // Broadcast updated client list to all connected users
    io.emit('clients-update', getConnectedUsers());
  });

  // Handle room creation
  socket.on('create-room', (roomName) => {
    const client = clients.get(socket.id);
    if (!client) return;

    if (rooms.has(roomName)) {
      socket.emit('room-error', `Room "${roomName}" already exists`);
      return;
    }

    rooms.set(roomName, new Set([socket.id]));
    socket.join(roomName);
    console.log(`${client.username} created room: ${roomName}`);

    socket.emit('room-joined', { roomName, users: getRoomUsers(roomName) });
    socket.emit('room-message', `You created room "${roomName}"`);
  });

  // Handle joining a room
  socket.on('join-room', (roomName) => {
    const client = clients.get(socket.id);
    if (!client) return;

    if (!rooms.has(roomName)) {
      socket.emit('room-error', `Room "${roomName}" does not exist`);
      return;
    }

    const room = rooms.get(roomName);
    room.add(socket.id);
    socket.join(roomName);
    console.log(`${client.username} joined room: ${roomName}`);

    const roomUsers = getRoomUsers(roomName);

    // Notify everyone in the room
    io.to(roomName).emit('room-joined', { roomName, users: roomUsers });
    io.to(roomName).emit('room-message', `${client.username} joined the room`);
  });

  // Handle leaving a room
  socket.on('leave-room', (roomName) => {
    const client = clients.get(socket.id);
    if (!client) return;

    const room = rooms.get(roomName);
    if (room) {
      room.delete(socket.id);
      socket.leave(roomName);
      console.log(`${client.username} left room: ${roomName}`);

      // If room is empty, delete it
      if (room.size === 0) {
        rooms.delete(roomName);
        console.log(`Room "${roomName}" deleted (empty)`);
      } else {
        // Notify remaining users
        io.to(roomName).emit('room-message', `${client.username} left the room`);
        io.to(roomName).emit('room-joined', { roomName, users: getRoomUsers(roomName) });
      }

      socket.emit('room-left', roomName);
    }
  });

  // Handle room messages
  socket.on('room-chat', ({ roomName, message }) => {
    const client = clients.get(socket.id);
    if (!client) return;

    const room = rooms.get(roomName);
    if (room && room.has(socket.id)) {
      io.to(roomName).emit('room-message', `${client.username}: ${message}`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const client = clients.get(socket.id);
    if (client) {
      console.log(`User disconnected: ${client.username} (${socket.id})`);

      // Remove from all rooms
      rooms.forEach((room, roomName) => {
        if (room.has(socket.id)) {
          room.delete(socket.id);
          io.to(roomName).emit('room-message', `${client.username} disconnected`);
          io.to(roomName).emit('room-joined', { roomName, users: getRoomUsers(roomName) });

          // Delete empty rooms
          if (room.size === 0) {
            rooms.delete(roomName);
            console.log(`Room "${roomName}" deleted (empty)`);
          }
        }
      });

      clients.delete(socket.id);

      // Broadcast updated client list
      io.emit('clients-update', getConnectedUsers());
    }
  });
});

// Example of namespace usage
// client-side: ws://localhost:3005/my-namespace
io.of("/my-namespace").on("connection", (socket) => {
  console.log("New connection to /my-namespace :", socket.id);
});

server.listen(3005, () => {
  console.log('Game server running at http://localhost:3005');
});