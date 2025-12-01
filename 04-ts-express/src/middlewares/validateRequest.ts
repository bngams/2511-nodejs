import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

/**
 * Middleware générique de validation des requêtes avec Zod
 * @param schema - Le schéma Zod à utiliser pour la validation
 * @returns Un middleware Express qui valide req.body
 */
export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Valider les données de la requête
      const result = schema.safeParse(req.body);

      if (!result.success) {
        // Si la validation échoue, extraire les erreurs
        const errors = result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message
        }));

        res.status(400).json({
          message: 'Erreur de validation',
          errors: errors
        });
        return;
      }

      // Si la validation réussit, remplacer req.body par les données validées
      req.body = result.data;
      next();
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la validation',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  };
};
