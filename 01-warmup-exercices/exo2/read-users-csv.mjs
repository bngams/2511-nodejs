import fs from "fs";
import path from "path";

const filePath = path.join(import.meta.dirname, "csv", "users.csv");

export function readUsersCSV() {
    // si le fichier n'existe pas renvoyer un tableau vide []

    // lire et stocker le contenu texte du fichier
    const data = fs.readFileSync(filePath, "utf8"); // lire le fichier avec readFileSync
    
    // traitement de chaque ligne pour alimenter un tableau json
    const users = [];
    data.split("\n").map(line => {
        // utiliser le .split sur la variable ligne pour récupérer les valeurs
        users.push({
            firstname: line.split(",")[0],
            lastname: line.split(",")[1],
            isActive: line.split(",")[2] === "true" // convertir en boolean
        });
    });
    return users;
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

// le code ci-dessous ne sera exécuté que si on appelle le fichier via node read-users-csv.mjs
if (import.meta.filename === process.argv[1]) {
    const users = readUsersCSV();
    console.log("Utilisateurs :", users.length);
    console.log("Utilisateurs actifs :");
    displayActiveUsers(users);
}

