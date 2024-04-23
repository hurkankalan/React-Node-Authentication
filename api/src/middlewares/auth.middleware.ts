import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest, JwtPayload } from "../types/users.type";

export function isAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

  if (token) {
    const privateKey = process.env.JWT_SECRET;

    if (!privateKey) {
      return res.status(404).json({
        error: "JWT_SECRET is missing, please contact the administrator",
      });
    }

    const checkTokenSignature = jwt.verify(token, privateKey);

    if (checkTokenSignature) {
      const decodedToken = jwt.decode(token) as JwtPayload;
      req.user = decodedToken;

      next();
    } else {
      return res.status(403).json({ error: "Unauthorized, token is invalid" });
    }
  } else {
    return res.status(401).json({ error: "No tokens provided" });
  }
}
