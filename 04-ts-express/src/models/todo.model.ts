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

// Interface pour les informations de pagination
export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Interface pour les filtres de recherche
export interface TodoFilters {
  completed?: boolean;
  page?: number;
  limit?: number;
}

// Interface pour la réponse paginée
export interface PaginatedTodoResponse {
  data: Todo[];
  pagination: PaginationInfo;
}
