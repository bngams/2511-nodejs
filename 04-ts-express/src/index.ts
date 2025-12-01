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
app.listen(PORT, (err) => {
  if (err) {
    console.error('Erreur lors du démarrage du serveur:', err);
    return;
  }
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
