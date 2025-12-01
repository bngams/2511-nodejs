// Classe de base pour toutes les erreurs de l'application
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  sendHttpResponse(res: any): void {
    res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
    });
  }
}

// Erreur 404 - Ressource non trouvée
export class NotFoundError extends AppError {
  constructor(message: string = 'Ressource non trouvée') {
    super(404, message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// Erreur 400 - Validation échouée
export class ValidationError extends AppError {
  constructor(message: string = 'Données invalides') {
    super(400, message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// Erreur 401 - Non autorisé
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non autorisé') {
    super(401, message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

// Erreur 500 - Erreur inconnue
export class UnknownError extends AppError {
  constructor(message: string = 'Erreur inconnue') {
    super(500, message);
    Object.setPrototypeOf(this, UnknownError.prototype);
    // Erreur inattendue - logger la stack trace
    console.error('Erreur inattendue:', message);
  }
}
