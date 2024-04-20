import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  const decodedToken = jwt.decode(token);

  if (!token) {
    return res.status(401).send("Access denied because there is no token.");
  }

  if (
    decodedToken instanceof Object &&
    "role" in decodedToken &&
    decodedToken.role === "admin"
  ) {
    next();
  } else {
    return res
      .status(403)
      .send("Access denied because you are not an administrator.");
  }
}
