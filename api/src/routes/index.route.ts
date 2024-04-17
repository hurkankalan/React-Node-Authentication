import { app } from "../index";
import userRouter from "./users.route";

app.use("/user", userRouter);
