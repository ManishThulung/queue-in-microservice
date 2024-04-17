import nodemailer from "nodemailer";

export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_SENDER,
      to: email,
      subject: title,
      html: body,
    });
    console.log(`Message sent to ${email}`);
  } catch (error) {
    throw new Error(error);
  }
};
