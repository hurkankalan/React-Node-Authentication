import { Router } from "express";
import usersControllers from "../controllers/users.controller";

const adminRouter = Router();

adminRouter.get("/", usersControllers.allUsers);
adminRouter.get("/:id", usersControllers.userById);
adminRouter.delete("/:id", usersControllers.deleteUser);

export default adminRouter;
