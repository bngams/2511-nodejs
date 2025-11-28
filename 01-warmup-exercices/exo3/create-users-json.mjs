import fs from "fs";
import path from "path";

const dossierEnCours = path.join(import.meta.dirname, "json");
const filePath = path.join(dossierEnCours, "users.json");

export function writeUsersToJSON(users) {
    // Convertir la liste des utilisateurs en chaîne de caractères JSON 
    // (serialiser avec JSON.stringify)
    // Écrire le JSON sérialisé dans le fichier avec `fs.writeFileSync`
    const jsonContent = JSON.stringify(users, null, 2);
    if (!fs.existsSync(dossierEnCours)) {
        throw new Error("Directory does not exist. Please create the 'json' directory first.");
    }
    fs.writeFileSync(filePath, jsonContent, "utf8");
}

// le code ci-dessous ne sera exécuté que si on appelle le fichier via node create-users-json.mjs
if (import.meta.filename === process.argv[1]) {
    const users = [
        { firstname: "Alice", lastname: "Dupont", isActive: true },
        { firstname: "Bob", lastname: "Martin", isActive: false },
        { firstname: "Charlie", lastname: "Durand", isActive: true }
    ];
    writeUsersToJSON(users);
}

    