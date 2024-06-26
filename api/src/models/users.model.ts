import pool from "../database/config.database";
import { QueryResult } from "pg";
import { Users } from "../types/users.type";

const usersModels = {
  getAllUsers(): Promise<QueryResult<Users>> {
    return pool.query("SELECT * FROM users");
  },

  getUserById(id: number): Promise<QueryResult<Users>> {
    return pool.query("SELECT * FROM users WHERE id = $1", [id]);
  },

  getUserByEmail(email: string): Promise<QueryResult<Users>> {
    return pool.query("SELECT * FROM users WHERE email = $1", [email]);
  },

  createUser(email: string, password: string): Promise<QueryResult> {
    return pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      password,
    ]);
  },

  updateUser(
    id: number,
    email: string,
    password: string
  ): Promise<QueryResult> {
    return pool.query(
      "UPDATE users SET email = $2, password = $3 WHERE id = $1",
      [id, email, password]
    );
  },

  deleteUser(id: number): Promise<QueryResult> {
    return pool.query("DELETE FROM users WHERE id = $1", [id]);
  },
};

export default usersModels;
