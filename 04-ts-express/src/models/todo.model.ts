// Interface principale représentant un Todo complet
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// DTO pour la création : on exclut les champs auto-générés
export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

// DTO pour la modification : tous les champs deviennent optionnels
export type UpdateTodoDto = Partial<CreateTodoDto>;
