import fs from "fs";
import path from "path";

const dossierEnCours = path.join(import.meta.dirname, "json");
const filePath = path.join(dossierEnCours, "users.json");

export function deleteUsersJSON() {
    if (fs.existsSync(filePath)) { // remplacer => verifier que le fichier existe fs.exists…
        fs.unlinkSync(filePath); // supprimer le fichier
        console.log("Fichier supprimé :", filePath);
    } else {
        console.log("Aucun fichier trouvé à supprimer.");
    }
}

// le code ci-dessous ne sera exécuté que si on appelle le fichier via node delete-users-csv.mjs
if (import.meta.filename === process.argv[1]) {
  deleteUsersJSON();
}

