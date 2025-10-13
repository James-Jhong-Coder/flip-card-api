export type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
};

export type RegisterDto = {
  email: string;
  password: string;
  name?: string | null;
};
