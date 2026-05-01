import express, { Application } from "express";
import cors from "cors";
import { config } from "dotenv";
import { configs } from "./app/configs";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
   res.send(`Server is running on port ${configs.port}`);
});



export default app;
