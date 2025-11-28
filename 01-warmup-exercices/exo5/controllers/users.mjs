
import { readUsersJSON } from "../../exo3/read-users-json.mjs";
import { writeUsersToJSON } from "../../exo3/create-users-json.mjs";
import { deleteUsersJSON } from "../../exo3/delete-users-json.mjs";

export const handleUsersRequest = (req, res) => {
  if (req.method === "GET" && req.url === "/users") { 
        const users = readUsersJSON();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
  } else if (req.method === "POST" && req.url === "/users") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const users = JSON.parse(body);
            writeUsersToJSON(users);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Utilisateurs créés avec succès" }));
        });
    } else if (req.method === "DELETE" && req.url === "/users") {
        deleteUsersJSON();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Fichier utilisateurs supprimé" }));
    } else {
        req.next();
    }
};