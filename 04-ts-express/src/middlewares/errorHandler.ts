import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

// Middleware pour logger les requêtes
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Middleware de gestion d'erreur
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Vérifier si c'est une erreur opérationnelle de notre application
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  // Erreur inattendue - logger et retourner 500
  console.error('Erreur inattendue:', err.stack);
  
  res.status(500).json({
    statusCode: 500,
    message: 'Une erreur interne est survenue',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
};