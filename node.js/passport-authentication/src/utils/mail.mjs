import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "dadasovsuleyman126@gmail.com",
    pass: "yaid jflx uqkl gesu",
  },
});
