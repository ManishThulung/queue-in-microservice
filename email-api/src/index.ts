import express, { Express, NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { worker } from "./queue/worker";
configDotenv();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server for email service");
});


app.post("/send-email", async (req: Request, res: Response) => {
  try {
    worker.run();
  } catch (error) {
    console.log(error);
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
