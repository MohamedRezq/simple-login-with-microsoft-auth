import nodemailer from "nodemailer";

// Create sendEmail service to help send verification sendEmails
const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "morezqdevtest@gmail.com",
        pass: "Test_123456",
      },
    });
    await transporter.sendMail({
      from: "morezqdevtest@gmail.com",
      to: email,
      subject: subject,
      html: html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent: ", error);
  }
};

export default sendEmail;