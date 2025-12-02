import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validateRequest } from '../middlewares/validateRequest';
import { createTodoSchema, updateTodoSchema } from '../validators/todoValidation';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const todoController = new TodoController();

// Routes CRUD
// IMPORTANT: La route /search doit être AVANT /:id pour éviter que "search" soit interprété comme un ID
router.get('/db', authMiddleware, (req, res, next) => todoController.getAllTodosFromDB(req, res, next));
router.get('/search', (req, res, next) => todoController.searchTodos(req, res, next));
router.get('/', (req, res, next) => todoController.getAllTodos(req, res, next));
router.get('/:id', (req, res, next) => todoController.getTodoById(req, res, next));
router.post('/', validateRequest(createTodoSchema), (req, res, next) => todoController.createTodo(req, res, next));
router.put('/:id', validateRequest(updateTodoSchema), (req, res, next) => todoController.updateTodo(req, res, next));
router.delete('/:id', (req, res, next) => todoController.deleteTodo(req, res, next));

export default router;
