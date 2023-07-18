import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: "textilworkspace.gb97.ec", //process.env.EMAIL_HOST,
    port: 465, //process.env.EMAIL_PORT,
    auth: {
      user: "soporte@textilworkspace.gb97.ec", //process.env.EMAIL_USER,
      pass: "soporteGB97", //process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "it_support@gb97.ec", //process.env.EMAIL_FROM,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Error sending email");
  }
}
