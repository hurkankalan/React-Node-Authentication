import { Router } from "express";
import usersControllers from "../controllers/users.controller";
import { app } from "../index";

const userRouter = Router();

userRouter.get("/", usersControllers.allUsers);
userRouter.get("/:id", usersControllers.userById);
userRouter.put("/:id", usersControllers.updateUser);
userRouter.delete("/:id", usersControllers.deleteUser);

export default userRouter;
