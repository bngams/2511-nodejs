import { Request, Response, NextFunction } from 'express';
import { AppError, UnknownError } from '../errors/AppError';

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
    err.sendHttpResponse(res); // send the formatted error response
    return;
  }

  new UnknownError('Une erreur interne est survenue').sendHttpResponse(res);
  
};