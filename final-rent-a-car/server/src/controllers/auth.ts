import { Request, Response } from "express";
import crypto from "crypto";

import User from "../mongoose/schemas/user";
import { hashPassword } from "../utils/bcrypt";
import { transporter } from "../utils/mail";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, username } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "Please fill in all fields" });
      return;
    }

    const alreadyExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (alreadyExists) {
      res
        .status(400)
        .json({ message: "User with this email&username already exists" });
      return;
    }

    const user = new User({
      email,
      username,
      password: hashPassword(password),
      name,
    });

    await user.save();

    res.send({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const login = async (req: Request, res: Response) => {
  const user = req.user;
  res.send({ message: "User logged in successfully", user });
};

const currentUser = async (req: Request, res: Response) => {
  const user = req.user;
  if (user?.avatar) user.avatar = `${process.env.BASE_URL}${user.avatar}`;
  res.json({ user });
};

const logout = (req: Request, res: Response) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).json({ message: "Internal server error!" });
    }
    res.send({ message: "User logged out successfully" });
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = new Date(Date.now() + 1000 * 60 * 15);

    await user.save();

    await transporter.sendMail({
      from: '"Passport Auth 👻" <dadasovsuleyman126@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset Your Password", // Subject line
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              overflow: hidden;
            }
            .email-header {
              background-color: #007bff;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 24px;
            }
            .email-body {
              padding: 20px;
              color: #333333;
            }
            .email-body p {
              line-height: 1.6;
            }
            .reset-button {
              display: inline-block;
              margin: 20px auto;
              padding: 10px 20px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              text-align: center;
            }
            .email-footer {
              padding: 10px;
              text-align: center;
              font-size: 12px;
              color: #777777;
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              Reset Your Password
            </div>
            <div class="email-body">
              <p>Hello, ${user.name}.</p>
              <p>We received a request to reset your password. Please click the button below to reset your password:</p>
              <a href="${process.env.CLIENT_URL}/reset-password/${token}" class="reset-button">
                Reset Password
              </a>
              <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
              <p>Thank you,<br>Passport Auth Team</p>
            </div>
            <div class="email-footer">
              &copy; 2024 Passport Auth. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `, // HTML body
    });

    res.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token!" });
      return;
    }

    user.password = hashPassword(password);
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpires = new Date(0);

    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const authController = {
  login,
  logout,
  register,
  currentUser,
  resetPassword,
  forgotPassword,
};

export default authController;
