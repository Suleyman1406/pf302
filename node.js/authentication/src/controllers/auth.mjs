import User from "../mongoose/schemas/user.mjs";
import { comparePassword, hashPassword } from "../utils/bcrypt.mjs";

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = new User({
      email,
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    if (!comparePassword(password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked!" });
    }

    req.session.userId = user._id;
    res.send({ message: "User logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const currentUser = async (req, res) => {
  res.json({ user: req.user });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
    res.clearCookie("connect.sid");
    res.send({ message: "Logged out successfully" });
  });
};

const authController = {
  login,
  logout,
  register,
  currentUser,
};

export default authController;
