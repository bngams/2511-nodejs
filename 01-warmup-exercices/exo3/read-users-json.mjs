import fs from "fs";
import path from "path";

const filePath = path.join(import.meta.dirname, "json", "users.json"); // ???

export function readUsersJSON() {
    // si le fichier n'existe pas renvoyer un tableau vide []

    // lire et stocker le contenu texte du fichier
    const data = fs.readFileSync(filePath, "utf8"); // lire le fichier avec readFileSync
    
    // traitement de chaque ligne pour alimenter un tableau json
    return JSON.parse(data);
}

/*
 * Afficher les utilisateurs actifs
 */
export function displayActiveUsers(users) {
    // boucle for classique sur users ou users.filter
    // console.log(`${user.firstname} ${user.lastname}`); // Affichage via ce code 
    users.filter(user => user.isActive).forEach(user => {
        console.log(`${user.firstname} ${user.lastname}`);
    });
}

// le code ci-dessous ne sera exécuté que si on appelle le fichier via node read-users-json.mjs
if (import.meta.filename === process.argv[1]) {
    const users = readUsersJSON();
    displayActiveUsers(users);
}