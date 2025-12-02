import jwt from 'jsonwebtoken';

export class AuthService {

  // Utilisateurs en dur pour tester
  private users = [
    { id: 1, email: 'alice@example.com', password: 'password123', name: 'Alice' },
    { id: 2, email: 'bob@example.com', password: 'password456', name: 'Bob' }
  ];

  login(email: string, password: string): string | null {
    // 1. Chercher l'utilisateur par email
    const user = this.users.find(u => u.email === email);

    // 2. Vérifier si trouvé et password correct
    if (!user || user.password !== password) {
      return null;
    }

    // 3. Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name }, // add roles to handle authorization
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return token;
  }
}
