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
