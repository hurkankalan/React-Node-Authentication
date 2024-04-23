import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const authRouter = Router();

authRouter.post("/register", usersControllers.register);
authRouter.post("/login", usersControllers.login);
authRouter.post("/logout", usersControllers.logout);

export default authRouter;
