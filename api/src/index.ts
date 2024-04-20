import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const port = process.env.API_PORT;
export const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(port, () => {
  console.log(`Server is running on port http://localhost/:${port}`);
});
