import nodemailer from "nodemailer";

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for MFA",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendOTP };
