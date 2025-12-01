import { Router } from 'express';
import { TodoController } from '../controllers/todoController';
import { validateRequest } from '../middlewares/validateRequest';
import { createTodoSchema, updateTodoSchema } from '../validators/todoValidation';

const router = Router();
const todoController = new TodoController();

// Routes CRUD
router.get('/', (req, res) => todoController.getAllTodos(req, res));
router.get('/:id', (req, res) => todoController.getTodoById(req, res));
router.post('/', validateRequest(createTodoSchema), (req, res) => todoController.createTodo(req, res));
router.put('/:id', validateRequest(updateTodoSchema), (req, res) => todoController.updateTodo(req, res));
router.delete('/:id', (req, res) => todoController.deleteTodo(req, res));

export default router;
