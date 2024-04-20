import { Request, Response } from "express";
import { app } from "../index";
import authRouter from "./auth.route";
import userRouter from "./users.route";

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to auth-app-ts !");
});

app.use(authRouter);
app.use("/api/users", userRouter);
