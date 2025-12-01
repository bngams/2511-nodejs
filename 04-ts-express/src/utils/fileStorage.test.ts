import fs from 'fs';
import path from 'path';
import { writeTodos } from './fileStorage';
import { Todo } from '../models/todo.model';

// Mock the fs module
jest.mock('fs');

const mockedFs = fs as jest.Mocked<typeof fs>;

// test suite for fileStorage.ts
describe('fileStorage', () => {
  // some global data
  const DATA_FILE = path.join(__dirname, '../../data/todos.test.json');
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: 'Test Todo 1',
      description: 'Description 1',
      completed: false,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      title: 'Test Todo 2',
      description: 'Description 2',
      completed: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  // hook: before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Tests for writeTodos function
  describe('writeTodos', () => {
    it('should create directory if it does not exist', () => {
      // 
      mockedFs.existsSync.mockReturnValue(false);
      mockedFs.mkdirSync.mockReturnValue(undefined);
      mockedFs.writeFileSync.mockReturnValue(undefined);

      writeTodos(mockTodos);

      expect(mockedFs.existsSync).toHaveBeenCalledWith(path.dirname(DATA_FILE));
      expect(mockedFs.mkdirSync).toHaveBeenCalledWith(path.dirname(DATA_FILE), { recursive: true });
    });

    it('should write todos to file with correct formatting', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.writeFileSync.mockReturnValue(undefined);

      writeTodos(mockTodos);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        DATA_FILE,
        JSON.stringify(mockTodos, null, 2),
        'utf-8'
      );
    });

    it('should write empty array to file', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.writeFileSync.mockReturnValue(undefined);

      writeTodos([]);

      expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
        DATA_FILE,
        JSON.stringify([], null, 2),
        'utf-8'
      );
    });

    it('should throw error if write fails', () => {
      const error = new Error('Write failed');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.writeFileSync.mockImplementation(() => {
        throw error;
      });

      expect(() => writeTodos(mockTodos)).toThrow('Write failed');
    });
  });
});
