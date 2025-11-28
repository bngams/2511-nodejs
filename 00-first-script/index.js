// Cannot combine ESM and CJS in the same file
// unless some compiler/transpiler is used (like TS, Babel, etc.)
// or some tips experimental features are enabled.
// node --experimental-modules --experimental-repl-await index.js...

// static import
// import os from 'node:os'; // Importing the 'os' module
// vs dynamic import (if you need to load conditionally or asynchronously)
// if (someCondition) {
// const os = await import('node:os');
// }
const osWithCJS = require('node:os'); // Importing the 'os' module

console.log("info", os.type());
console.log("info", osWithCJS.release());