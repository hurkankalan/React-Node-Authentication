import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/", usersControllers.allUsers);
userRouter.get("/:id", usersControllers.userById);
userRouter.put("/:id", usersControllers.updateUser);
userRouter.delete("/:id", usersControllers.deleteUser);
userRouter.post("/register", usersControllers.register);
userRouter.post("/login", usersControllers.login);

export default userRouter;
