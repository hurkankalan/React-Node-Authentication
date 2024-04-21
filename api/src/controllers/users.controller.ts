import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { comparePassword } from "../utils/comparePassword";
import { hashPassword } from "../utils/hashPassword";
import usersModels from "../models/users.model";
import { Users } from "../types/users.type";

const usersControllers = {
  async allUsers(req: Request, res: Response): Promise<Response<Users>> {
    try {
      const users = await usersModels.getAllUsers();

      if (users.rowCount === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      return res.status(200).json(users.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async userById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }

    try {
      const user = await usersModels.getUserById(parseInt(id));

      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { email, password } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Id is required" });
    }

    if (!email && !password) {
      return res.status(400).json({
        error:
          "Email or password informations are required for updating user information",
      });
    }

    try {
      const oldUserInfos = await usersModels.getUserById(parseInt(id));

      if (!oldUserInfos.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      if (
        email === oldUserInfos.rows[0].email &&
        password === oldUserInfos.rows[0].password
      ) {
        return res
          .status(304)
          .json({ error: "No changes detected, user not updated" });
      }

      const newUserInfos = {
        email:
          oldUserInfos.rows[0].email !== email
            ? email
            : oldUserInfos.rows[0].email,
        password:
          oldUserInfos.rows[0].password !== password
            ? await hashPassword(password)
            : oldUserInfos.rows[0].password,
      };

      const newUser = await usersModels.updateUser(
        parseInt(id),
        newUserInfos.email,
        newUserInfos.password
      );

      if (newUser.rowCount === 0) {
        return res.status(500).json({ error: "Error during updating user" });
      }

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json("Id is required");
    }

    try {
      const checkUserIsExist = await usersModels.getUserById(parseInt(id));

      if (!checkUserIsExist.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      const deleteUser = await usersModels.deleteUser(parseInt(id));

      if (deleteUser.rowCount === 0) {
        return res.status(500).json({ error: "Error duraing deleting user" });
      }

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) {
        res.status(400).json({ error: "Email and/or password are missing" });
      }
    }

    try {
      const user = await usersModels.getUserByEmail(email);

      if (user.rows[0]) {
        return res.status(409).json({ error: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await usersModels.createUser(email, hashedPassword);

      if (newUser.rowCount === 0) {
        return res.status(500).json({ error: "User isn't created" });
      }

      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const token = req.headers["authorization"];

    for (const key in req.body) {
      if (!req.body[key]) {
        res.status(400).json({ error: "Email and/or password are missing" });
      }
    }

    if (token) {
      return res.status(403).json({
        error:
          "An account is already connected, please disconnect the current account first before logging into your account",
      });
    }

    try {
      const user = await usersModels.getUserByEmail(email);

      if (!user.rows[0]) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordIsValid = await comparePassword(
        password,
        user.rows[0].password
      );

      if (!passwordIsValid) {
        return res
          .status(401)
          .json({ error: "Password is incorrect, authentication failed" });
      }

      if (!process.env.JWT_SECRET) {
        return res.status(404).json({
          error: "JWT_SECRET is missing, please contact the administrator",
        });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          email: user.rows[0].email,
          role: user.rows[0].role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(201).json(token);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async logout(req: Request, res: Response): Promise<Response> {
    const token = req.headers["authorization"];

    try {
      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      req.headers["authorization"] = "";

      return res
        .status(200)
        .json({ message: "You have been successfully disconnected" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default usersControllers;
