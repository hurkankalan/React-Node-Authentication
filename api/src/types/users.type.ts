export type Users = {
  id: number;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at: Date;
};
