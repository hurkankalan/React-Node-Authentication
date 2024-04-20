import { Router } from "express";
import usersControllers from "../controllers/users.controller";
import { isAdmin } from "../middlewares/admin.middlware";

const userRouter = Router();

userRouter.get("/", isAdmin, usersControllers.allUsers);
userRouter.get("/:id", usersControllers.userById);
userRouter.put("/:id", usersControllers.updateUser);
userRouter.delete("/:id", usersControllers.deleteUser);

export default userRouter;
