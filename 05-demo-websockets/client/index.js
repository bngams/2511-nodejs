import { io } from 'socket.io-client';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const SERVER_URL = "ws://localhost:3005";
let socket = null;
let username = '';
let currentRoom = null;
let connectedUsers = [];
let rl = null;

// Connect to server
const connectToServer = () => {
  socket = io(SERVER_URL);

  // Connection event
  socket.on('connect', () => {
    console.log(`\n✓ Connected to game server (ID: ${socket.id})`);

    // Register username with server
    socket.emit('register', username);
  });

  // Receive updated client list
  socket.on('clients-update', (users) => {
    connectedUsers = users;

    // Always show update if not in a room
    if (!currentRoom) {
      console.log('\n🔔 User list updated!');
      showMainMenu();
    }
  });

  // Room joined successfully
  socket.on('room-joined', ({ roomName, users }) => {
    currentRoom = roomName;
    console.log(`\n🚪 Room: ${roomName}`);
    console.log(`👥 Users in room: ${users.join(', ')}`);
  });

  // Room messages
  socket.on('room-message', (message) => {
    console.log(`💬 ${message}`);
  });

  // Room error
  socket.on('room-error', (error) => {
    console.log(`❌ Error: ${error}`);
  });

  // Room left
  socket.on('room-left', (roomName) => {
    console.log(`\n👋 You left room: ${roomName}`);
    currentRoom = null;
  });

  // Disconnection event
  socket.on('disconnect', () => {
    console.log('\n✗ Disconnected from server');
  });
};

// Show main menu with connected users
const showMainMenu = () => {
  console.log('\n====================================');
  console.log('📋 Connected users:', connectedUsers.length > 0 ? connectedUsers.join(', ') : 'None');
  console.log('====================================');
  console.log('========== MENU ==========');
  console.log('1. Create room');
  console.log('2. Join room');
  console.log('3. Leave / Disconnect');
  console.log('==========================');
};

// Create a room
const createRoom = async () => {
  const roomName = await rl.question('Enter room name: ');
  if (roomName.trim()) {
    socket.emit('create-room', roomName);
    // Wait a bit for server response
    await new Promise(resolve => setTimeout(resolve, 100));
    if (currentRoom === roomName) {
      await enterRoomChat(roomName);
    }
  } else {
    console.log('❌ Room name cannot be empty');
  }
};

// Join an existing room
const joinRoom = async () => {
  const roomName = await rl.question('Enter room name to join: ');
  if (roomName.trim()) {
    socket.emit('join-room', roomName);
    // Wait a bit for server response
    await new Promise(resolve => setTimeout(resolve, 100));
    if (currentRoom === roomName) {
      await enterRoomChat(roomName);
    }
  } else {
    console.log('❌ Room name cannot be empty');
  }
};

// Room chat interface
const enterRoomChat = async (roomName) => {
  console.log(`\n💬 You are now in room "${roomName}"`);
  console.log('Type your messages (or "quit" / "q" to leave the room)');

  // Simple message loop
  let inRoom = true;
  while (inRoom) {
    const message = await rl.question('> ');

    if (message.toLowerCase() === 'quit' || message.toLowerCase() === 'q') {
      socket.emit('leave-room', roomName);
      inRoom = false;
      currentRoom = null;
      // Give time for server to process
      await new Promise(resolve => setTimeout(resolve, 100));
    } else if (message.trim()) {
      socket.emit('room-chat', { roomName, message });
    }
  }
};

// Disconnect and exit
const disconnect = () => {
  console.log('\n👋 Goodbye!');
  if (currentRoom) {
    socket.emit('leave-room', currentRoom);
  }
  socket.disconnect();
  process.exit(0);
};

// Main function
const main = async () => {
  // Create readline interface
  rl = readline.createInterface({ input, output });

  console.log('========================================');
  console.log('   Welcome to the Game Server!');
  console.log('========================================\n');

  // Ask for username
  username = await rl.question('Enter your username: ');

  if (!username.trim()) {
    console.log('❌ Username is required');
    rl.close();
    process.exit(1);
  }

  console.log(`\nHello, ${username}! Connecting to server...`);

  // Connect to server
  connectToServer();

  // Wait for connection
  await new Promise(resolve => setTimeout(resolve, 500));

  // Main menu loop
  let running = true;
  while (running) {
    showMainMenu();
    const choice = await rl.question('Choose an option (1-3): ');

    switch (choice) {
      case '1':
        await createRoom();
        break;
      case '2':
        await joinRoom();
        break;
      case '3':
        disconnect();
        running = false;
        break;
      default:
        console.log('❌ Invalid option, please choose 1-3');
    }
  }
};

// Start the application
main().catch(console.error);