// Récupérer les arguments passés en ligne de commande
// Ignorer les deux premiers arguments
const args = process.argv // argv est un tableau utiliser Array.slice(x) pour récupérer uniquement les deux arguments qui nous intéressent

// Vérifier qu'il y a bien deux arguments retenus dans notre variable args
if (args.length <= 2) {
    console.log("Usage: node index.mjs <nom> <prenom>");
    process.exit(1); // sortir du programme et renvoyer une erreur
}

// Extraire le nom et prénom
const nom = args[2];
const prenom =  args[3];

// // Afficher le message en console
console.log(`Hello ${nom} ${prenom}`);