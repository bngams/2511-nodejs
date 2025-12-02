import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { LoginDto } from '../models/user.model';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login(req: Request, res: Response): void {
    const { email, password }: LoginDto = req.body;

    // Valider les données
    if (!email || !password) {
      res.status(400).json({ message: 'Email et password sont requis' });
      return;
    }

    // Appeler le service d'authentification
    const token = this.authService.login(email, password);

    if (token) {
      res.status(200).json({
        token,
        message: 'Connexion réussie'
      });
    } else {
      res.status(401).json({
        message: 'Identifiants invalides'
      });
    }
  }
}
