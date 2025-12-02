import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // 1. Récupérer le header Authorization
  const authHeader = req.headers.authorization;
  
  // 2. Vérifier s'il existe
  if (!authHeader) {
    res.status(401).json({ message: 'Token manquant' });
    return;
  } 
  
  // 3. Extraire le token (format: "Bearer <token>")
  // Utilisez .split(' ') pour séparer "Bearer" du token
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Token manquant' });
    return;
  }
  // 4. Si token ok, on laisse passer
  try {
    const decoded = jwt.verify(
      token, // Token à vérifier
      process.env.JWT_SECRET! // Même secret
    );
  
    console.log(decoded); // { userId: 1, email: 'alice@example.com', iat: ..., exp: ... }
    // check expriation, userId, etc. as needed..
    next();
  } catch (error) {
    console.log('Token invalide ou expiré');
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
}