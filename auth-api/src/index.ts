import express, { Express, NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { sendEmail } from "./queue/producer";
configDotenv();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await sendEmail({
      to: email,
      subject: "OTP Verification",
      html: `<h3>Verify your OPT: 720913</h3>`,
    });
    return res.json({
      message: "email added to queue, email will be sent soon",
    });
  } catch (error) {
    console.log(error);
  }
});

// for error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
