import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/users", usersControllers.allUsers);
userRouter.get("/user/:id", usersControllers.userById);
userRouter.put("/user/:id", usersControllers.updateUser);
userRouter.delete("/user/:id", usersControllers.deleteUser);
userRouter.post("/register", usersControllers.register);
userRouter.post("/login", usersControllers.login);

export default userRouter;
