import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/users.type";
import usersModels from "../models/users.model";

export function isAdmin(req: any, res: Response, next: NextFunction) {
  const token = req.headers["authorization"].split(" ")[1];

  const decodedToken = jwt.decode(token) as JwtPayload;

  if (!token) {
    return res.status(401).send("Access denied because there is no token.");
  }

  if (decodedToken.role === "admin") {
    const user = usersModels.getUserByEmail(decodedToken.email);

    if (user[0] && user[0].role !== "admin") {
      return res
        .status(403)
        .send("Access denied because you are not an administrator.");
    } else {
      next();
    }
  } else {
    return res
      .status(403)
      .send("Access denied because you are not an administrator.");
  }
}
