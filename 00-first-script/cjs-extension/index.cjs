console.log("Hello, world!");
console.log("This is my first Node.js script.");

// Base JS API is available in node.js
const currentDate = new Date();
console.log("Current date and time:", currentDate);

const randomNumber = Math.random();
console.log("Random number between 0 and 1:", randomNumber);

// Node.js specific API
console.log("Current working directory:", process.cwd());
console.log("Node.js version:", process.version);

// Node.js built-in module example (Node.js native library)
const os = require('node:os'); // Importing the 'os' module
console.log("Operating System Info:", os.type(), os.release());