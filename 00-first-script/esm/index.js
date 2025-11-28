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
import os from 'node:os'; // Importing the 'os' module
console.log("Operating System Info:", os.type(), os.release());

// readdir example
import { readdir } from 'node:fs/promises';

async function listCurrentDirectory() {
  readdir(process.cwd()).then(files => {
    console.log("Files in current directory:", files);
  }).catch(err => {
    console.error("Error reading directory:", err);
  });
}
listCurrentDirectory();

import { add } from './operations.js';  
const sum = add(5, 3);
console.log("Sum of 5 and 3 is:", sum);

import mathModule from './operations.js';
const result = mathModule.add(4, 2);
console.log("Sum of 4 and 2 is:", result);