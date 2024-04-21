import { Router } from "express";
import usersControllers from "../controllers/users.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", usersControllers.register);
authRouter.post("/login", usersControllers.login);
authRouter.post("/logout", isAuthenticated, usersControllers.logout);

export default authRouter;
