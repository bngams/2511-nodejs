export interface User {
  id: number;
  email: string;
  password: string; // ⚠️ Sera hashé plus tard
  name: string;
  createdAt: Date;
}

export type LoginDto = {
  email: string;
  password: string;
};
