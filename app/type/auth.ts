export type User = {
  contributions: number;
  email: string;
  githubId: string;
  id: number;
  username: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
