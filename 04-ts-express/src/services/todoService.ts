import { Todo, CreateTodoDto, UpdateTodoDto, TodoFilters, PaginatedTodoResponse } from '../models/todo.model';
import { readTodos, writeTodos } from '../utils/fileStorage';

export class TodoService {

  // Récupérer tous les todos avec filtrage et pagination
  getAllTodos(filters?: TodoFilters): PaginatedTodoResponse {
    let todos = readTodos();

    // Filtrage par statut completed
    if (filters?.completed !== undefined) {
      todos = todos.filter(todo => todo.completed === filters.completed);
    }

    // Calculer le total avant pagination
    const total = todos.length;

    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Extraire la page demandée
    const paginatedTodos = todos.slice(startIndex, endIndex);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedTodos,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    };
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

  // Rechercher des todos par texte
  searchTodos(query: string): Todo[] {
    const todos = readTodos();
    const searchTerm = query.toLowerCase();

    // Filtrer les todos où title OU description contient le terme de recherche
    return todos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm) || 
      todo.description.toLowerCase().includes(searchTerm)
    );
  }
}
