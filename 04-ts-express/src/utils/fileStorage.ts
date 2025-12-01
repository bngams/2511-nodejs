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
