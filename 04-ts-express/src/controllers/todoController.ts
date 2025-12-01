import { Request, Response, NextFunction } from 'express';
import { TodoService } from '../services/todoService';
import { CreateTodoDto, UpdateTodoDto, TodoFilters } from '../models/todo.model';
import { ValidationError } from '../errors/AppError';

const todoService = new TodoService();

export class TodoController {

  getAllTodos(req: Request, res: Response, next: NextFunction): void {
    try {
      // Extraire les query parameters
      const filters: TodoFilters = {};

      // Convertir le paramètre 'completed' de string à boolean
      if (req.query.completed !== undefined) {
        const completedStr = req.query.completed as string;
        filters.completed = completedStr === 'true';
      }

      // Convertir le paramètre 'page' de string à number
      if (req.query.page !== undefined) {
        const pageNum = parseInt(req.query.page as string);
        if (!isNaN(pageNum) && pageNum > 0) {
          filters.page = pageNum;
        }
      }

      // Convertir le paramètre 'limit' de string à number
      if (req.query.limit !== undefined) {
        const limitNum = parseInt(req.query.limit as string);
        if (!isNaN(limitNum) && limitNum > 0) {
          filters.limit = limitNum;
        }
      }

      // Appeler le service avec les filtres
      const result = todoService.getAllTodos(filters);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  getTodoById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new ValidationError('ID invalide');
      }

      const todo = todoService.getTodoById(id);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  createTodo(req: Request, res: Response, next: NextFunction): void {
    try {
      // La validation est maintenant gérée par le middleware validateRequest
      const data: CreateTodoDto = req.body;

      const newTodo = todoService.createTodo(data);
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }

  updateTodo(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateTodoDto = req.body;

      if (isNaN(id)) {
        throw new ValidationError('ID invalide');
      }

      const updatedTodo = todoService.updateTodo(id, data);
      res.json(updatedTodo);
    } catch (error) {
      next(error);
    }
  }

  deleteTodo(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new ValidationError('ID invalide');
      }

      todoService.deleteTodo(id);
      res.json({ message: 'Todo supprimé avec succès' });
    } catch (error) {
      next(error);
    }
  }

  searchTodos(req: Request, res: Response, next: NextFunction): void {
    try {
      const query = req.query.q as string;

      // Vérifier que le paramètre q existe
      if (!query) {
        throw new ValidationError('Le paramètre de recherche "q" est requis');
      }

      const results = todoService.searchTodos(query);
      
      res.json({
        query,
        count: results.length,
        results
      });
    } catch (error) {
      next(error);
    }
  }
}
