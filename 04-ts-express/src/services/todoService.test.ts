import { TodoService } from './todoService';
import { readTodos } from '../utils/fileStorage';
import { Todo } from '../models/todo.model';

// Mock the fileStorage module
jest.mock('../utils/fileStorage');

const mockedReadTodos = readTodos as jest.MockedFunction<typeof readTodos>;

describe('TodoService', () => {
  let todoService: TodoService;

  const mockTodos: Todo[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, eggs, and bread',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      title: 'Complete project',
      description: 'Finish the TypeScript assignment',
      completed: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: 3,
      title: 'Call dentist',
      description: 'Schedule appointment for next week',
      completed: false,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ];

  beforeEach(() => {
    todoService = new TodoService();
    jest.clearAllMocks();
  });

  describe('searchTodos', () => {
    it('should return todos matching title search term', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('groceries');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Buy groceries');
    });

    it('should return todos matching description search term', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('TypeScript');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Complete project');
    });

    it('should be case insensitive', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('GROCERIES');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Buy groceries');
    });

    it('should return multiple todos if they match', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('e');

      expect(result.length).toBeGreaterThan(0);
      result.forEach(todo => {
        expect(
          todo.title.toLowerCase().includes('e') ||
          todo.description.toLowerCase().includes('e')
        ).toBe(true);
      });
    });

    it('should return empty array if no matches found', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('xyz123');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should return empty array if todos list is empty', () => {
      mockedReadTodos.mockReturnValue([]);

      const result = todoService.searchTodos('test');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });

    it('should match partial words in title', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('proj');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Complete project');
    });

    it('should match partial words in description', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.searchTodos('appoint');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Call dentist');
    });
  });

  describe('getTodoById', () => {
    it('should return the correct todo by ID', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      const result = todoService.getTodoById(2);

      expect(result).toBeDefined();
      expect(result.id).toBe(2);
      expect(result.title).toBe('Complete project');
    });

    it('should throw NotFoundError for non-existing ID', () => {
      mockedReadTodos.mockReturnValue(mockTodos);

      expect(() => {
        todoService.getTodoById(999);
      }).toThrow('Todo avec l\'id 999 non trouvé');
    });
    
  });
});
