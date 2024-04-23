import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const userRouter = Router();

userRouter.get("/", usersControllers.userById);
userRouter.put("/", usersControllers.updateUser);
userRouter.delete("/", usersControllers.deleteUser);

export default userRouter;
