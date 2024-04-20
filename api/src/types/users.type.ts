export type Users = {
  id: number;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at: Date;
};

export type JwtPayload = {
  id: number;
  email: string;
  role: "admin" | "user";
};
