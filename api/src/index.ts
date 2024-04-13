import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to auth-app-ts !");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});
