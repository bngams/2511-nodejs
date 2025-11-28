import http from "http";
import { handleUsersRequest } from "./controllers/users.mjs";

export const server = http.createServer();
server.on('request', (req, res) => {

  // replace with loadControllers logic
  // import("./controllers/*").then(...)
  handleUsersRequest(req, res);
  
  req.next = () => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  };
});

const port = 3003;
server.listen(port, () => {
    console.log(`Serveur API démarré sur http://localhost:${port}`);
});