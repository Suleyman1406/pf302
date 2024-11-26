import User from "../mongoose/schemas/user.mjs";

const getAll = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password -resetPasswordToken -resetPasswordTokenExpires"
    );

    res.json({
      items: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({ message: "You can't block yourself!" });
    }

    if (user.role === "superadmin") {
      return res.status(400).json({ message: "You can't block superadmin!" });
    }

    user.isBlocked = true;
    await user.save();

    res.json({ message: "User blocked successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({ message: "You can't unblock yourself!" });
    }

    user.isBlocked = false;
    await user.save();

    res.json({ message: "User unblocked successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id === id) {
      return res.status(400).json({ message: "You can't delete yourself!" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role!" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.id === req.user.id) {
      return res.status(400).json({ message: "You can't change your role!" });
    }

    user.role = role;

    await user.save();
    res.json({ message: "User role changed successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  remove,
  getAll,
  blockUser,
  changeRole,
  unblockUser,
};

export default userController;
