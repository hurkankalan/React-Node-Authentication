import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import { isAuthenticated } from "./middlewares/auth.middleware";
import { isAdmin } from "./middlewares/admin.middlware";

const app = express();
dotenv.config();
const port = process.env.API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to auth-app-ts !");
});

app.use(authRouter);
app.use("/api/user", isAuthenticated, userRouter);
app.use("/api/admin", isAdmin, adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost/:${port}`);
});
