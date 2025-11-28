import fs from "fs";
import path from "path";
import { jsonArrayToCSV } from "./utils/csv.mjs";

const users = [
    { firstname: "Alice", lastname: "Dupont", isActive: true },
    { firstname: "Bob", lastname: "Martin", isActive: false },
    { firstname: "Charlie", lastname: "Durand", isActive: true }
];

const dossierEnCours = path.join(import.meta.dirname, "csv");
const filePath = path.join(dossierEnCours, "users.csv");

export function writeUsersToCSV(users) {
    // const csvContent = users
    //     .map(user => `${user.firstname},${user.lastname},${user.isActive}`) // array of strings
    //     .join("\n"); // single string with new lines

    const csvContent = jsonArrayToCSV(users, false);
    
    // if file or directory does not exist, create it
    if (!fs.existsSync(dossierEnCours)) {
        // many options according to the needs:
        // 1) trigger an error if the directory does not exist
        throw new Error("Directory does not exist. Please create the 'csv' directory first.");
        // 2) create the directory
        // try {
        // fs.mkdirSync(dossierEnCours, { recursive: true });
        // } catch (error) {
        //     console.error("Error creating directory:", error);
        //     return;
        // }
        // 3) ask the user if we have to create the directory now in the program
        //console.log("Do you want to create the directory:", dossierEnCours);
    }
    fs.writeFileSync(filePath, csvContent, "utf8");
    fs.writeFile()
    fs.write
    
    console.log("Fichier CSV créé :", filePath);
}

// le code ci-dessous ne sera exécuté que si on appelle le fichier via node create-users-csv.mjs
if (import.meta.filename === `${process.argv[1]}`) {
  writeUsersToCSV(users);
}