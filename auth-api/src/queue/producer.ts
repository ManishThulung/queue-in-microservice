import { Queue, Worker } from "bullmq";
import { redisConnection } from "../redis/redis.connection";

type EmailType = {
  to: string;
  subject: string;
  html: string;
};

const emailQueue = new Queue("email-queue-microservice", {
  connection: redisConnection,
});

export const sendEmail = async (email: EmailType) => {
  const res = await emailQueue.add("email", { ...email }, { delay: 1000 });
  console.log("job added: ", res.id);
};

// use to produce email in bulk
export const sendEmailInBulk = async (email: EmailType) => {
  await emailQueue.addBulk([
    {
      name: "one",
      data: { to: "ram@gmail.com", subject: "email", html: "email body" },
    },
    {
      name: "one",
      data: { to: "ram@gmail.com", subject: "email", html: "email body" },
    },
  ]);
};
