import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/:id", usersControllers.userById);
userRouter.put("/:id", usersControllers.updateUser);
userRouter.delete("/:id", usersControllers.deleteUser);

export default userRouter;
