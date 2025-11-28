import http from 'node:http';

// Create a local server to receive data from
const server = http.createServer();

// Listen to the request event
server.on('request', (request, res) => {
  // /hello
  if(request.url === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello World!</h1>');
  }
  // /api/hello?name=Boris
  else if(request.url === '/api/hello') {
    // request query params
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!',
    }));
  }
  else {
    // Not found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(8000);
console.log('Server is listening on http://localhost:8000');