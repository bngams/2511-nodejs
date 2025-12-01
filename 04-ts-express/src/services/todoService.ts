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
