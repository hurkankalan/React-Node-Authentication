import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/users.route";

export const app = express();
const port = process.env.API_PORT;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to auth-app-ts !");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost/:${port}`);
});
