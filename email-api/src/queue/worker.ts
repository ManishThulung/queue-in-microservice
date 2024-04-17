import { Worker } from "bullmq";
import { redisConnection } from "../redis/redis.connection";
import { mailSender } from "../email-service/email.service";

export const worker = new Worker(
  "email-queue-microservice",
  async (job) => {
    console.log(`message receive id: ${job.id}`);
    console.log(`processing message`);
    console.log(`sending email to: ${job.data.to}`);
    const { to, subject, html } = job.data;
    await mailSender(to, subject, html);
    console.log(job?.data, "email sent");
  },
  {
    connection: redisConnection, // redis connection configuration
    removeOnComplete: { count: 5 }, // keep up to latest 5 jobs and remove all older jobs
  }
);

