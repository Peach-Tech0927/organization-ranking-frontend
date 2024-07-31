export type User = {
  contributions: number;
  email: string;
  githubId: string;
  id: number;
  username: string;
};

export type AuthRegisterResponse = {
  token: string;
  user: User;
};
