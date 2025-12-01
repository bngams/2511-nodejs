import { z } from 'zod';

// Schéma de validation pour la création d'un todo
export const createTodoSchema = z.object({
  title: z
    .string({
      error: (issue) => issue.input === undefined 
        ? "Le titre est requis" 
        : "Le titre doit être une chaîne de caractères" 
    })
    .min(3, 'Le titre doit contenir au minimum 3 caractères')
    .max(100, 'Le titre ne doit pas dépasser 100 caractères'),

  description: z
    .string({
      error: (issue) => issue.input === undefined 
        ? "La description est requise" 
        : "La description doit être une chaîne de caractères" 
    })
    .min(10, 'La description doit contenir au minimum 10 caractères')
    .max(500, 'La description ne doit pas dépasser 500 caractères'),

  completed: z
    .boolean({
      error: (issue) => issue.input === undefined 
        ? "Le statut completed est requis" 
        : "Le statut completed doit être un booléen" 
    })
});

// Schéma de validation pour la modification d'un todo
// Tous les champs sont optionnels
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au minimum 3 caractères')
    .max(100, 'Le titre ne doit pas dépasser 100 caractères')
    .optional(),

  description: z
    .string()
    .min(10, 'La description doit contenir au minimum 10 caractères')
    .max(500, 'La description ne doit pas dépasser 500 caractères')
    .optional(),

  completed: z
    .boolean({
      error: (issue) => issue.input === undefined 
        ? "Le statut completed est requis" 
        : "Le statut completed doit être un booléen" 
    })
    .optional()
});

// Types TypeScript inférés depuis les schémas Zod
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
