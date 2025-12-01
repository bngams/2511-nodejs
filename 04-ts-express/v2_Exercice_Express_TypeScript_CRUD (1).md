# 🚀 Express + TypeScript - API REST avec CRUD

**Exercice pratique : Construction progressive d'une API REST professionnelle**

---

## 🎯 Objectifs de l'exercice

À la fin de cet exercice, vous serez capable de :

- ✅ Initialiser un projet Node.js avec TypeScript
- ✅ Configurer Express avec les outils de développement (nodemon, dotenv)
- ✅ Structurer un projet selon l'architecture MVC (Model-View-Controller)
- ✅ Implémenter un CRUD complet (Create, Read, Update, Delete)
- ✅ Utiliser les middlewares Express
- ✅ Gérer la persistance des données dans un fichier JSON

> 💡 **Approche pédagogique** : Nous allons construire l'application **étape par étape**. Après chaque étape, vous pourrez lancer le serveur et tester ce que vous venez de créer. Pas de frustration à attendre la fin !

---

## 📦 Partie 1 : Initialisation et Configuration du Projet

### 1.1 Création du projet

Ouvrez un terminal et exécutez les commandes suivantes :

```bash
mkdir express-typescript-crud
cd express-typescript-crud
npm init -y
```

**📖 Explication :**
Cette commande crée un nouveau dossier et initialise un projet Node.js avec un fichier `package.json`.

---

### 1.2 Installation des dépendances

Nous allons installer plusieurs packages. Voici leur rôle :

#### 📚 Dépendances de production

- **express** : Framework web pour créer notre serveur et gérer les routes
- **dotenv** : Charge les variables d'environnement depuis un fichier `.env`
- **cors** : Permet les requêtes cross-origin (utile pour les front-ends)

**Installation :**

```bash
npm install express dotenv cors
```

#### 🛠 Dépendances de développement

- **typescript** : Compilateur TypeScript
- **@types/node** : Définitions de types pour Node.js
- **@types/express** : Définitions de types pour Express
- **@types/cors** : Définitions de types pour CORS
- **nodemon** : Redémarre automatiquement le serveur lors des modifications
- **ts-node** : Exécute TypeScript directement sans compilation préalable

**Installation :**

```bash
npm install --save-dev typescript @types/node @types/express @types/cors nodemon ts-node
```

> 💡 **Note importante sur body-parser** : Depuis Express 4.16+, le middleware `express.json()` est intégré ! Il n'est plus nécessaire d'installer le package `body-parser` séparément. Express inclut maintenant ces fonctionnalités nativement.

---

### 1.3 Configuration de TypeScript

Créez un fichier `tsconfig.json` à la racine du projet :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**📖 Explication des options importantes :**

- `target: ES2020` - Version JavaScript ciblée
- `module: commonjs` - Système de modules (compatible Node.js)
- `outDir: ./dist` - Dossier de sortie pour le code compilé
- `rootDir: ./src` - Dossier source de notre code TypeScript
- `strict: true` - Active toutes les vérifications strictes de TypeScript
- `resolveJsonModule: true` - Permet d'importer des fichiers JSON

---

### 1.4 Configuration des scripts NPM

Modifiez le fichier `package.json` pour ajouter les scripts :

```json
"scripts": {
  "dev": "nodemon src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

**📖 Explication des scripts :**

- `dev` : Lance le serveur en mode développement avec nodemon (redémarrage auto)
- `build` : Compile le TypeScript en JavaScript dans le dossier `dist`
- `start` : Lance le serveur en production avec le code compilé

---

### 1.5 Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
PORT=3000
NODE_ENV=development
```

Créez également un fichier `.gitignore` pour ne pas versionner certains fichiers :

```gitignore
node_modules
dist
.env
data/*.json
```

---

## 📁 Partie 2 : Structure du Projet

Nous allons créer une architecture professionnelle en séparant les responsabilités. **Mais attention** : nous n'allons pas créer tous les dossiers tout de suite ! Nous allons les créer au fur et à mesure, en testant à chaque étape.

**Structure finale visée :**

```
express-typescript-crud/
├── src/
│   ├── controllers/     # Gère les requêtes HTTP
│   │   └── todoController.ts
│   ├── services/        # Logique métier
│   │   └── todoService.ts
│   ├── models/          # Définition des types/interfaces
│   │   └── todo.model.ts
│   ├── routes/          # Définition des routes
│   │   └── todoRoutes.ts
│   ├── middlewares/     # Middlewares personnalisés
│   │   └── errorHandler.ts
│   ├── utils/           # Fonctions utilitaires
│   │   └── fileStorage.ts
│   └── index.ts         # Point d'entrée
├── data/                # Stockage des fichiers JSON
│   └── todos.json
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

**📖 Rôle de chaque dossier :**

- **controllers** : Reçoit les requêtes HTTP, valide les données, appelle les services
- **services** : Contient la logique métier (créer, lire, modifier, supprimer)
- **models** : Définit les interfaces TypeScript pour nos données
- **routes** : Déclare les endpoints et associe les controllers
- **middlewares** : Fonctions qui s'exécutent avant/après les routes
- **utils** : Fonctions réutilisables (lecture/écriture fichiers)

**Pour commencer, créez juste le dossier source :**

```bash
mkdir src
```

---

## 🔨 Partie 3 : Implémentation Progressive

> 🎯 **Objectif** : Construire l'application étape par étape. Après chaque étape, vous pourrez tester et voir les résultats !

---

### 3.1 Étape 1 : Premier lancement - Serveur Express minimal

#### 🎯 Objectif
Créer un serveur fonctionnel qui démarre, affiche un message de bienvenue, et vérifie que :
- TypeScript compile correctement
- Nodemon redémarre automatiquement
- Les variables d'environnement sont chargées

#### 💻 Code

Créez le fichier `src/index.ts` :

```typescript
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route de test
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API Todo - Serveur Express + TypeScript',
    status: 'running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

#### 🧪 Test

Lancez le serveur :

```bash
npm run dev
```

Vous devriez voir :

```
🚀 Serveur démarré sur http://localhost:3000
📝 Environment: development
```

Testez dans votre navigateur ou avec curl :

```bash
curl http://localhost:3000
```

**Réponse attendue :**

```json
{
  "message": "🚀 API Todo - Serveur Express + TypeScript",
  "status": "running",
  "environment": "development"
}
```

#### ✅ Vérifications

**Testez le live reload (nodemon) :**
1. Modifiez le message dans le code (par exemple : "API Todo v2")
2. Sauvegardez le fichier
3. Nodemon devrait redémarrer automatiquement
4. Rafraîchissez votre navigateur - le nouveau message apparaît !

**📖 Ce que nous avons appris :**
- ✅ Configuration de base d'Express
- ✅ Chargement des variables d'environnement avec dotenv
- ✅ Typage TypeScript (Request, Response, Application)
- ✅ Middleware `express.json()` pour parser les requêtes JSON
- ✅ Redémarrage automatique avec nodemon

---

### 3.2 Étape 2 : Ajouter des routes simples

#### 🎯 Objectif
Créer plusieurs routes pour comprendre le routage Express avant d'implémenter le CRUD complet.

#### 💻 Code

Modifiez `src/index.ts` pour ajouter des routes :

```typescript
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route principale
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API Todo - Serveur Express + TypeScript',
    endpoints: {
      'GET /': 'Page d\'accueil',
      'GET /health': 'Vérifier l\'état du serveur',
      'GET /todos': 'Liste des todos (à venir)',
      'POST /todos': 'Créer un todo (à venir)'
    }
  });
});

// Route de santé (health check)
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Route temporaire pour tester GET /todos
app.get('/todos', (req: Request, res: Response) => {
  res.json({ 
    message: 'Liste des todos',
    data: [
      { id: 1, title: 'Exemple 1', completed: false },
      { id: 2, title: 'Exemple 2', completed: true }
    ]
  });
});

// Route temporaire pour tester POST /todos
app.post('/todos', (req: Request, res: Response) => {
  const { title, description } = req.body;
  
  res.status(201).json({ 
    message: 'Todo créé (temporaire)',
    data: {
      id: Date.now(), // ID temporaire
      title,
      description,
      completed: false,
      createdAt: new Date()
    }
  });
});

// Gestion des routes inexistantes (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.path 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

#### 🧪 Test

Le serveur devrait redémarrer automatiquement. Testez les nouvelles routes :

**1. Health check :**
```bash
curl http://localhost:3000/health
```

**2. GET /todos :**
```bash
curl http://localhost:3000/todos
```

**3. POST /todos :**
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Apprendre Express", "description": "Tester les routes"}'
```

**4. Route 404 :**
```bash
curl http://localhost:3000/route-inexistante
```

**📖 Ce que nous avons appris :**
- ✅ Créer plusieurs routes (GET, POST)
- ✅ Récupérer les données du body avec `req.body`
- ✅ Retourner différents status codes (200, 201, 404)
- ✅ Gérer les routes 404

---

### 3.3 Étape 3 : Ajouter la logique métier (Models, Services, Utils)

#### 🎯 Objectif
Maintenant que nous avons des routes fonctionnelles, nous allons ajouter la vraie logique métier avec persistance dans un fichier JSON.

#### 📂 Créer la structure

```bash
mkdir src/models src/services src/utils data
```

#### 3.3.1 Modèle (Model) avec pattern DTO

**📚 Comprendre le pattern DTO (Data Transfer Object)**

Le **DTO** est un pattern qui définit des objets pour transférer des données entre couches.

**🤔 Pourquoi utiliser des DTOs ?**

Quand un utilisateur crée un todo, il ne doit fournir que le `title`, la `description` et le statut `completed`. Il ne peut pas fournir l'`id` (généré par le serveur) ni les dates (auto-générées).

**Avantages :**
- ✅ **Sécurité** : Empêche l'envoi de champs non autorisés
- ✅ **Clarté** : Indique explicitement les données attendues
- ✅ **Validation** : Plus facile à valider
- ✅ **Maintenance** : Si le modèle change, les DTOs restent stables

Créez le fichier `src/models/todo.model.ts` :

```typescript
// Interface principale représentant un Todo complet
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// DTO pour la création : on exclut les champs auto-générés
export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

// DTO pour la modification : tous les champs deviennent optionnels
export type UpdateTodoDto = Partial<CreateTodoDto>;
```

**Exemple d'utilisation :**

```typescript
// ✅ VALIDE - Créer un todo
const createData: CreateTodoDto = {
  title: "Apprendre TypeScript",
  description: "Comprendre les DTOs",
  completed: false
};

// ❌ INVALIDE - TypeScript refusera
const invalidCreate: CreateTodoDto = {
  id: 1, // ❌ Erreur : 'id' n'existe pas dans CreateTodoDto
  title: "Test",
  description: "Test",
  completed: false
};
```

#### 3.3.2 Utilitaires - Gestion du fichier (Utils)

Créez le fichier `src/utils/fileStorage.ts` :

```typescript
import fs from 'fs';
import path from 'path';
import { Todo } from '../models/todo.model';

const DATA_FILE = path.join(__dirname, '../../data/todos.json');

export const readTodos = (): Todo[] => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Si le fichier n'existe pas, créer un tableau vide
      writeTodos([]);
      return [];
    }
    
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return [];
  }
};

export const writeTodos = (todos: Todo[]): void => {
  try {
    const dir = path.dirname(DATA_FILE);
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    throw error;
  }
};
```

#### 3.3.3 Service - Logique métier

Créez le fichier `src/services/todoService.ts` :

```typescript
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo.model';
import { readTodos, writeTodos } from '../utils/fileStorage';

export class TodoService {
  
  // Récupérer tous les todos
  getAllTodos(): Todo[] {
    return readTodos();
  }

  // Récupérer un todo par son ID
  getTodoById(id: number): Todo | undefined {
    const todos = readTodos();
    return todos.find(todo => todo.id === id);
  }

  // Créer un nouveau todo
  createTodo(data: CreateTodoDto): Todo {
    const todos = readTodos();
    
    // Générer un nouvel ID
    const newId = todos.length > 0 
      ? Math.max(...todos.map(t => t.id)) + 1 
      : 1;
    
    const newTodo: Todo = {
      id: newId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    todos.push(newTodo);
    writeTodos(todos);
    
    return newTodo;
  }

  // Mettre à jour un todo
  updateTodo(id: number, data: UpdateTodoDto): Todo | null {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return null;
    }
    
    todos[index] = {
      ...todos[index],
      ...data,
      updatedAt: new Date()
    };
    
    writeTodos(todos);
    return todos[index];
  }

  // Supprimer un todo
  deleteTodo(id: number): boolean {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return false;
    }
    
    todos.splice(index, 1);
    writeTodos(todos);
    return true;
  }
}
```

#### 3.3.4 Mise à jour de index.ts

Maintenant, remplacez les routes temporaires par les vraies qui utilisent le service :

```typescript
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { TodoService } from './services/todoService';
import { CreateTodoDto, UpdateTodoDto } from './models/todo.model';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;
const todoService = new TodoService();

app.use(express.json());

// Route principale
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API Todo - Serveur Express + TypeScript',
    endpoints: {
      'GET /todos': 'Liste tous les todos',
      'GET /todos/:id': 'Récupère un todo par ID',
      'POST /todos': 'Crée un nouveau todo',
      'PUT /todos/:id': 'Met à jour un todo',
      'DELETE /todos/:id': 'Supprime un todo'
    }
  });
});

// GET /todos - Récupérer tous les todos
app.get('/todos', (req: Request, res: Response) => {
  try {
    const todos = todoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// GET /todos/:id - Récupérer un todo par ID
app.get('/todos/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }
    
    const todo = todoService.getTodoById(id);
    
    if (!todo) {
      res.status(404).json({ message: 'Todo non trouvé' });
      return;
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// POST /todos - Créer un nouveau todo
app.post('/todos', (req: Request, res: Response) => {
  try {
    const data: CreateTodoDto = req.body;
    
    if (!data.title || !data.description) {
      res.status(400).json({ message: 'Title et description requis' });
      return;
    }
    
    const newTodo = todoService.createTodo(data);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// PUT /todos/:id - Mettre à jour un todo
app.put('/todos/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data: UpdateTodoDto = req.body;
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }
    
    const updatedTodo = todoService.updateTodo(id, data);
    
    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo non trouvé' });
      return;
    }
    
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// DELETE /todos/:id - Supprimer un todo
app.delete('/todos/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID invalide' });
      return;
    }
    
    const deleted = todoService.deleteTodo(id);
    
    if (!deleted) {
      res.status(404).json({ message: 'Todo non trouvé' });
      return;
    }
    
    res.json({ message: 'Todo supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
```

#### 🧪 Test du CRUD complet

Le serveur devrait redémarrer. Testez maintenant le CRUD complet :

**1. Créer un todo :**
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Apprendre Express", "description": "Maîtriser le CRUD", "completed": false}'
```

**2. Récupérer tous les todos :**
```bash
curl http://localhost:3000/todos
```

**3. Récupérer un todo :**
```bash
curl http://localhost:3000/todos/1
```

**4. Modifier un todo :**
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**5. Supprimer un todo :**
```bash
curl -X DELETE http://localhost:3000/todos/1
```

**6. Vérifier la persistance :**
Regardez le fichier `data/todos.json` - vos données sont sauvegardées !

**📖 Ce que nous avons appris :**
- ✅ Pattern DTO pour la sécurité des données
- ✅ Séparation des responsabilités (Model, Service, Utils)
- ✅ CRUD complet fonctionnel
- ✅ Persistance dans un fichier JSON
- ✅ Gestion des erreurs basique

---

### 3.4 Étape 4 : Améliorer avec Middlewares et Routes modulaires

#### 🎯 Objectif
Notre fichier `index.ts` commence à être long (130+ lignes). Nous allons :
- Créer des middlewares réutilisables
- Séparer les routes dans un fichier dédié
- Séparer les controllers
- Ajouter un logger de requêtes

#### 📂 Créer la structure

```bash
mkdir src/middlewares src/routes src/controllers
```

#### 3.4.1 Middlewares

Créez le fichier `src/middlewares/errorHandler.ts` :

```typescript
import { Request, Response, NextFunction } from 'express';

// Middleware pour logger les requêtes
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Middleware de gestion d'erreur
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Erreur:', err.stack);
  
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
```

**📖 Qu'est-ce qu'un middleware ?**

Un middleware est une fonction qui a accès aux objets `request`, `response` et `next`. Il peut :
- Exécuter du code
- Modifier request/response
- Terminer le cycle requête-réponse
- Appeler le middleware suivant avec `next()`

**Ordre d'exécution des middlewares :**
```
requête → requestLogger → express.json() → routes → errorHandler → réponse
```

#### 3.4.2 Controller

Créez le fichier `src/controllers/todoController.ts` :

```typescript
import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';
import { CreateTodoDto, UpdateTodoDto } from '../models/todo.model';

const todoService = new TodoService();

export class TodoController {
  
  getAllTodos(req: Request, res: Response): void {
    try {
      const todos = todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  getTodoById(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID invalide' });
        return;
      }
      
      const todo = todoService.getTodoById(id);
      
      if (!todo) {
        res.status(404).json({ message: 'Todo non trouvé' });
        return;
      }
      
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  createTodo(req: Request, res: Response): void {
    try {
      const data: CreateTodoDto = req.body;
      
      if (!data.title || !data.description) {
        res.status(400).json({ message: 'Title et description requis' });
        return;
      }
      
      const newTodo = todoService.createTodo(data);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  updateTodo(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateTodoDto = req.body;
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID invalide' });
        return;
      }
      
      const updatedTodo = todoService.updateTodo(id, data);
      
      if (!updatedTodo) {
        res.status(404).json({ message: 'Todo non trouvé' });
        return;
      }
      
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }

  deleteTodo(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'ID invalide' });
        return;
      }
      
      const deleted = todoService.deleteTodo(id);
      
      if (!deleted) {
        res.status(404).json({ message: 'Todo non trouvé' });
        return;
      }
      
      res.json({ message: 'Todo supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  }
}
```

#### 3.4.3 Routes

Créez le fichier `src/routes/todoRoutes.ts` :

```typescript
import { Router } from 'express';
import { TodoController } from '../controllers/todoController';

const router = Router();
const todoController = new TodoController();

// Routes CRUD
router.get('/', (req, res) => todoController.getAllTodos(req, res));
router.get('/:id', (req, res) => todoController.getTodoById(req, res));
router.post('/', (req, res) => todoController.createTodo(req, res));
router.put('/:id', (req, res) => todoController.updateTodo(req, res));
router.delete('/:id', (req, res) => todoController.deleteTodo(req, res));

export default router;
```

**📖 Tableau récapitulatif des routes :**

| Méthode HTTP | Route        | Controller      | Description              |
|--------------|--------------|-----------------|--------------------------|
| GET          | /todos       | getAllTodos     | Liste tous les todos     |
| GET          | /todos/:id   | getTodoById     | Récupère un todo par ID  |
| POST         | /todos       | createTodo      | Crée un nouveau todo     |
| PUT          | /todos/:id   | updateTodo      | Met à jour un todo       |
| DELETE       | /todos/:id   | deleteTodo      | Supprime un todo         |

#### 3.4.4 Mise à jour de index.ts (version finale)

Remplacez tout le contenu de `src/index.ts` :

```typescript
import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import { errorHandler, requestLogger } from './middlewares/errorHandler';

// Charger les variables d'environnement
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Route principale
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: '🚀 API Todo - Serveur Express + TypeScript',
    version: '1.0.0',
    endpoints: {
      'GET /todos': 'Liste tous les todos',
      'GET /todos/:id': 'Récupère un todo',
      'POST /todos': 'Crée un todo',
      'PUT /todos/:id': 'Met à jour un todo',
      'DELETE /todos/:id': 'Supprime un todo'
    }
  });
});

// Routes todos
app.use('/todos', todoRoutes);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route non trouvée', path: req.path });
});

// Middleware d'erreur (doit être en dernier)
app.use(errorHandler);

// Démarrage
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

#### 🧪 Test

Le serveur redémarre. Testez à nouveau le CRUD - tout fonctionne pareil, mais le code est maintenant bien organisé !

Vous devriez voir dans la console les logs de chaque requête :

```
[2024-01-15T10:30:00.000Z] GET /todos
[2024-01-15T10:30:05.000Z] POST /todos
[2024-01-15T10:30:10.000Z] PUT /todos/1
```

**📖 Ce que nous avons appris :**
- ✅ Architecture MVC complète (Model-View-Controller)
- ✅ Middlewares personnalisés (logger, error handler)
- ✅ Routes modulaires avec Router
- ✅ Séparation complète des responsabilités
- ✅ Code maintenable et professionnel

**🎉 Félicitations !** Vous avez une API REST complète et professionnelle !

**📊 Récapitulatif de l'architecture finale :**

```
📦 Fichiers créés (9 au total) :
├── src/index.ts              (34 lignes) - Point d'entrée
├── src/routes/todoRoutes.ts  (12 lignes) - Routes
├── src/controllers/todoController.ts (80 lignes) - Controllers
├── src/services/todoService.ts (55 lignes) - Logique métier
├── src/models/todo.model.ts   (8 lignes) - Types
├── src/utils/fileStorage.ts  (28 lignes) - Utilitaires
└── src/middlewares/errorHandler.ts (20 lignes) - Middlewares

Total : ~237 lignes de code pour une API REST complète !
```

---

## 📝 Partie 4 : Exercices Pratiques

Maintenant que vous avez une API fonctionnelle, voici des exercices pour approfondir vos compétences. **Important** : Ces exercices ne fournissent pas le code complet - à vous de le coder ! Des pistes et exemples sont donnés pour vous guider.

---

### Exercice 1 : Validation avec Zod ⭐⭐

**🎯 Objectif :** Remplacer la validation manuelle par un système robuste avec Zod

#### 📚 Comprendre Zod

**Zod** est une bibliothèque de validation TypeScript-first. Contrairement à express-validator, Zod permet :

- ✅ **Inférence de types automatique** : Les types TypeScript sont générés depuis vos schémas
- ✅ **Validation puissante** : Règles complexes avec messages personnalisés
- ✅ **Intégration TypeScript parfaite** : Pas de duplication type/validation
- ✅ **API moderne et intuitive** : Code plus lisible

**Exemple de schéma Zod :**

```typescript
import { z } from 'zod';

// Définir le schéma
const userSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  age: z.number().min(18, 'Doit être majeur'),
  email: z.string().email('Email invalide')
});

// Inférer le type TypeScript
type User = z.infer<typeof userSchema>;

// Valider des données
const result = userSchema.safeParse({ name: 'Alice', age: 25, email: 'alice@example.com' });
if (result.success) {
  console.log(result.data); // Données validées
} else {
  console.log(result.error.errors); // Liste des erreurs
}
```

#### 🎯 Tâches à réaliser

**1. Installation**

Installez Zod :
```bash
npm install zod
```

**2. Créer les schémas de validation**

Créez un nouveau dossier : `mkdir src/validators`

Dans `src/validators/todoValidation.ts`, créez deux schémas :
- `createTodoSchema` : pour valider la création d'un todo
- `updateTodoSchema` : pour valider la modification

**💡 Pistes :**
- Utilisez `z.object()` pour définir un objet
- Pour title : minimum 3 caractères, maximum 100
- Pour description : minimum 10 caractères, maximum 500
- Pour completed : doit être un boolean
- Pour updateTodoSchema : tous les champs doivent être `.optional()`

**3. Créer un middleware de validation réutilisable**

Dans `src/middlewares/validateRequest.ts`, créez une fonction qui :
- Accepte un schéma Zod en paramètre
- Retourne un middleware Express
- Utilise `schema.safeParse(req.body)` pour valider
- Si erreur : retourne status 400 avec les erreurs
- Si succès : appelle `next()`

**💡 Structure attendue :**
```typescript
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Votre code ici
  };
};
```

**4. Appliquer la validation dans les routes**

Modifiez `src/routes/todoRoutes.ts` pour ajouter le middleware avant les controllers :

```typescript
router.post('/', validateRequest(createTodoSchema), (req, res) => todoController.createTodo(req, res));
```

**5. Nettoyer le controller**

Une fois la validation dans le middleware, vous pouvez supprimer les vérifications manuelles dans le controller !

**6. Tester**

Testez avec des données invalides :
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "AB", "description": "Court", "completed": false}'
```

Vous devriez recevoir un message d'erreur détaillé !

**📖 Ce que vous apprenez :**
- ✅ Validation centralisée avec Zod
- ✅ Création de middlewares réutilisables
- ✅ Inférence de types TypeScript
- ✅ Gestion propre des erreurs de validation

---

### Exercice 2 : Filtrage et Pagination ⭐⭐

**🎯 Objectif :** Permettre aux clients de filtrer et paginer les résultats

#### 📚 Comprendre la pagination

**Pourquoi paginer ?**
- Éviter de surcharger le serveur et le client
- Améliorer les performances
- Meilleure expérience utilisateur

**Concepts clés :**
- **page** : Numéro de page (commence à 1)
- **limit** : Nombre d'éléments par page
- **offset** : Position de départ = (page - 1) × limit
- **total** : Nombre total d'éléments
- **totalPages** : Math.ceil(total / limit)

**Exemple de réponse paginée :**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

#### 🎯 Tâches à réaliser

**1. Modifier la signature de getAllTodos dans le service**

La méthode doit accepter des filtres optionnels :
```typescript
getAllTodos(filters?: { 
  completed?: boolean;
  page?: number;
  limit?: number;
}): { data: Todo[]; pagination: PaginationInfo }
```

**💡 Pistes :**
- Utilisez `Array.filter()` pour le filtrage
- Utilisez `Array.slice(startIndex, endIndex)` pour la pagination
- Calculez startIndex et endIndex à partir de page et limit
- Retournez un objet avec `data` et `pagination`

**2. Créer une interface pour PaginationInfo**

Dans `src/models/todo.model.ts`, ajoutez :
```typescript
export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

**3. Modifier le controller getAllTodos**

Le controller doit :
- Extraire les query parameters : `req.query.completed`, `req.query.page`, `req.query.limit`
- Convertir les strings en types appropriés (boolean, number)
- Passer les filtres au service
- Retourner le résultat

**💡 Attention :** Les query params sont toujours des strings ! Vous devez les convertir.

**4. Tester**

```bash
# Page 1, 5 éléments par page
curl "http://localhost:3000/todos?page=1&limit=5"

# Seulement les todos complétés
curl "http://localhost:3000/todos?completed=true"

# Combinaison
curl "http://localhost:3000/todos?completed=false&page=2&limit=10"
```

**📖 Ce que vous apprenez :**
- ✅ Gestion des query parameters
- ✅ Pagination côté serveur
- ✅ Filtrage de données
- ✅ Conversion de types

---

### Exercice 3 : Recherche Full-Text ⭐⭐

**🎯 Objectif :** Implémenter une recherche dans les todos

#### 📚 Comprendre la recherche

**Recherche simple :**
- Chercher dans title ET description
- Case-insensitive (majuscules/minuscules ignorées)
- Résultats triés par pertinence (optionnel)

**Route attendue :**
```
GET /todos/search?q=typescript
```

**⚠️ Important :** Cette route doit être déclarée **AVANT** la route `/:id` dans votre routeur !

**Pourquoi ?** Express traite les routes dans l'ordre. Si `/:id` vient en premier, "search" sera interprété comme un ID.

```typescript
// ✅ CORRECT
router.get('/search', ...)
router.get('/:id', ...)

// ❌ INCORRECT
router.get('/:id', ...)
router.get('/search', ...) // "search" sera capturé par /:id
```

#### 🎯 Tâches à réaliser

**1. Ajouter une méthode searchTodos dans le service**

La méthode doit :
- Accepter un paramètre `query: string`
- Convertir la recherche en minuscules
- Filtrer les todos où title OU description contient la recherche
- Retourner les résultats

**💡 Pistes :**
- Utilisez `.toLowerCase()` pour ignorer la casse
- Utilisez `.includes()` pour vérifier la présence du terme
- Utilisez l'opérateur `||` pour "OU"

**2. Créer une méthode searchTodos dans le controller**

Le controller doit :
- Récupérer le paramètre `q` depuis `req.query`
- Vérifier que `q` existe (sinon erreur 400)
- Appeler le service
- Retourner les résultats avec le nombre de résultats

**3. Ajouter la route dans todoRoutes.ts**

**⚠️ AVANT la route `/:id` !**

**4. Tester**

```bash
# Rechercher "typescript"
curl "http://localhost:3000/todos/search?q=typescript"

# Rechercher "express"
curl "http://localhost:3000/todos/search?q=express"

# Sans paramètre (devrait retourner erreur 400)
curl "http://localhost:3000/todos/search"
```

**💡 Bonus (optionnel) :**
- Combiner recherche ET filtres (completed, page, limit)
- Trier par pertinence (nombre d'occurrences du terme)
- Surligner les termes trouvés dans les résultats

**📖 Ce que vous apprenez :**
- ✅ Recherche full-text basique
- ✅ Manipulation de strings
- ✅ Ordre des routes dans Express
- ✅ Gestion des query parameters

---

### Exercice 4 : Gestion avancée des erreurs ⭐⭐⭐

**🎯 Objectif :** Créer un système d'erreurs professionnel

#### 📚 Comprendre les erreurs personnalisées

**Pourquoi des erreurs personnalisées ?**
- Code plus lisible et maintenable
- Messages d'erreur cohérents
- Gestion centralisée
- Facilite le debugging

**Concept : Classes d'erreur**

En TypeScript, vous pouvez créer des classes d'erreur qui étendent `Error` :

```typescript
class NotFoundError extends Error {
  statusCode = 404;
  
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Utilisation
throw new NotFoundError('Todo non trouvé');
```

#### 🎯 Tâches à réaliser

**1. Créer les classes d'erreur**

Créez le fichier `src/errors/AppError.ts` avec plusieurs classes :

**Classe de base :**
```typescript
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
```

**Classes spécifiques à créer :**
- `NotFoundError` : status 404
- `ValidationError` : status 400
- `UnauthorizedError` : status 401

**💡 Piste :** Chaque classe étend `AppError` et définit son propre `statusCode`

**2. Modifier le middleware errorHandler**

Le middleware doit :
- Vérifier si l'erreur est une `AppError`
- Si oui : retourner le statusCode et le message
- Si non : retourner 500 avec message générique

**💡 Structure :**
```typescript
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    // Gérer AppError
  } else {
    // Gérer erreur inconnue
  }
};
```

**3. Utiliser les erreurs dans le service**

Au lieu de retourner `null` ou `undefined`, lancez des erreurs :

```typescript
getTodoById(id: number): Todo {
  const todo = ...;
  if (!todo) {
    throw new NotFoundError(`Todo avec l'id ${id} non trouvé`);
  }
  return todo;
}
```

**4. Adapter les controllers**

Les controllers n'ont plus besoin de vérifier si le résultat est null - l'erreur sera automatiquement catchée !

**5. Tester**

```bash
# Todo inexistant
curl http://localhost:3000/todos/999

# Devrait retourner
{
  "statusCode": 404,
  "message": "Todo avec l'id 999 non trouvé"
}
```

**📖 Ce que vous apprenez :**
- ✅ Classes d'erreur personnalisées
- ✅ Héritage en TypeScript
- ✅ Gestion centralisée des erreurs
- ✅ Code plus propre et expressif

---

### Exercice 5 (Bonus) : Tests avec Jest ⭐⭐⭐

**🎯 Objectif :** Ajouter des tests automatisés

#### 📚 Comprendre les tests

**Types de tests :**
- **Tests unitaires** : Tester une fonction isolée
- **Tests d'intégration** : Tester plusieurs composants ensemble
- **Tests E2E** : Tester l'application complète

**Jest** : Framework de test JavaScript/TypeScript
**Supertest** : Pour tester les routes HTTP

#### 🎯 Tâches à réaliser

**1. Installation**

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

**2. Configuration**

Créez `jest.config.js` à la racine pour configurer Jest avec TypeScript.

**💡 Recherchez :** "jest typescript configuration" pour les options

**3. Tester le service TodoService**

Créez `src/services/__tests__/todoService.test.ts`

Testez :
- Création d'un todo
- Récupération par ID
- Mise à jour
- Suppression
- Erreurs (todo inexistant)

**💡 Structure d'un test Jest :**
```typescript
describe('TodoService', () => {
  test('devrait créer un todo', () => {
    // Arrange (préparer)
    const service = new TodoService();
    
    // Act (agir)
    const result = service.createTodo({...});
    
    // Assert (vérifier)
    expect(result).toHaveProperty('id');
    expect(result.title).toBe('...');
  });
});
```

**4. Tester les routes avec Supertest**

Créez `src/__tests__/app.test.ts`

Testez les routes HTTP :
```typescript
import request from 'supertest';
import app from '../app'; // Vous devrez exporter app

test('GET /todos devrait retourner 200', async () => {
  const response = await request(app).get('/todos');
  expect(response.status).toBe(200);
});
```

**5. Ajouter les scripts**

Dans `package.json` :
```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

**📖 Ce que vous apprenez :**
- ✅ Tests automatisés avec Jest
- ✅ Tests d'API avec Supertest
- ✅ Bonnes pratiques de testing
- ✅ Coverage de code

---

## 💪 Conseils pour les exercices

### Stratégie de résolution

1. **Lire l'exercice en entier** avant de commencer
2. **Comprendre le concept** expliqué
3. **Créer les fichiers** nécessaires
4. **Coder étape par étape** en testant régulièrement
5. **Débugger** avec console.log si besoin
6. **Tester** avec curl ou Postman

### Ressources utiles

- Documentation Zod : https://zod.dev/
- Documentation Jest : https://jestjs.io/
- Array methods : filter, map, slice, find
- TypeScript Handbook : types, interfaces, classes

### Demander de l'aide

Si vous êtes bloqué :
1. Relisez les pistes données
2. Vérifiez les erreurs dans la console
3. Utilisez `console.log` pour debug
4. Comparez avec le code existant
5. Demandez au formateur !

**Bon courage ! 🚀**

---

## ✨ Partie 5 : Bonnes Pratiques

### Architecture en couches

- ✅ **Séparer les responsabilités** : Chaque couche a un rôle précis
- ✅ **Pas de logique métier dans les controllers** : Le controller ne fait que orchestrer
- ✅ **Services indépendants d'Express** : Peuvent être réutilisés ailleurs
- ✅ **Un fichier = une responsabilité** : Facilite la maintenance

### Gestion des erreurs

- ✅ **Toujours utiliser try/catch** dans les controllers
- ✅ **Messages d'erreur clairs** : Aider au debug
- ✅ **Logger les erreurs** : console.error ou Winston
- ✅ **Pas de détails techniques en production** : Sécurité

### Sécurité

- ✅ **Valider toutes les entrées** : Zod, express-validator
- ✅ **Variables d'environnement** : Ne jamais commit les secrets
- ✅ **CORS approprié** : Restreindre les origines en production
- ✅ **Rate limiting** : Protéger contre les abus (express-rate-limit)
- ✅ **Helmet** : Headers de sécurité (helmet package)

### Code TypeScript

- ✅ **Typage explicite** : Tous les paramètres et retours
- ✅ **Interfaces pour les structures** : Meilleure documentation
- ✅ **Éviter 'any'** : Utiliser 'unknown' si nécessaire
- ✅ **Mode strict activé** : Détecte plus d'erreurs

### Middlewares

- ✅ **Ordre crucial** : Logger → Parser → Routes → Error Handler
- ✅ **Utiliser next()** : Passer au middleware suivant
- ✅ **Error handler en dernier** : 4 paramètres (err, req, res, next)
- ✅ **Middlewares réutilisables** : DRY (Don't Repeat Yourself)

### Performance

- ✅ **Compression** : Compresser les réponses (compression package)
- ✅ **Cache** : Redis pour les données fréquentes
- ✅ **Indexation** : Si base de données
- ✅ **Pagination** : Ne pas retourner toutes les données

### Documentation

- ✅ **README.md** : Comment installer et lancer
- ✅ **Commentaires** : Expliquer le "pourquoi", pas le "comment"
- ✅ **Swagger/OpenAPI** : Documentation API interactive
- ✅ **Postman Collection** : Faciliter les tests

---

## 🎉 Conclusion

**Félicitations !** Vous avez créé une API REST complète et professionnelle avec :

- ✅ Un serveur Express configuré avec TypeScript
- ✅ Une architecture MVC maintenable
- ✅ Un CRUD complet pour gérer des todos
- ✅ Des middlewares pour la gestion des erreurs et le logging
- ✅ La persistance des données dans un fichier JSON
- ✅ Une validation robuste avec Zod
- ✅ Une structure de projet réutilisable

**Cette structure peut servir de base pour tous vos futurs projets Node.js/Express !**

---

## 💡 Pour aller plus loin

### Base de données

- 🔹 **MongoDB** : Base NoSQL populaire (avec Mongoose)
- 🔹 **PostgreSQL** : Base relationnelle robuste (avec TypeORM ou Prisma)
- 🔹 **Redis** : Cache et sessions

### Authentification

- 🔹 **JWT** : JSON Web Tokens pour l'auth stateless
- 🔹 **Passport.js** : Stratégies d'authentification multiples
- 🔹 **OAuth2** : Login avec Google, GitHub, etc.

### Tests

- 🔹 **Jest** : Tests unitaires et d'intégration
- 🔹 **Supertest** : Tests d'API HTTP
- 🔹 **Test coverage** : Mesurer la couverture de code

### Déploiement

- 🔹 **Docker** : Conteneurisation de l'application
- 🔹 **CI/CD** : GitHub Actions, GitLab CI
- 🔹 **Heroku** : Déploiement simple et rapide
- 🔹 **AWS / Azure / GCP** : Cloud platforms

### Monitoring & Logging

- 🔹 **Winston** : Logger avancé
- 🔹 **Morgan** : HTTP request logger
- 🔹 **PM2** : Process manager pour production
- 🔹 **Sentry** : Error tracking

### Outils additionnels

- 🔹 **Swagger** : Documentation API automatique
- 🔹 **ESLint** : Linter pour code quality
- 🔹 **Prettier** : Formateur de code
- 🔹 **Husky** : Git hooks pour pré-commit

---

## 📚 Ressources utiles

- [Documentation Express](https://expressjs.com/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Zod](https://zod.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [RESTful API Design](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
