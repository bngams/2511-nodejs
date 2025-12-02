import sql from "../utils/db";

export const getAllTodosQuery = sql`
  SELECT * FROM todos ORDER BY id;
`;

export const getTodoByIdQuery = sql`
  SELECT * FROM todos WHERE id = $1;
`;

export const createTodoQuery = sql`
  INSERT INTO todos (todo, completed)
  VALUES ($1, $2)
  RETURNING *;
`;