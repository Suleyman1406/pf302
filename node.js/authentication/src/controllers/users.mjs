import User from "../mongoose/schemas/user.mjs";

const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-password");

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

const userController = {
  getAll,
  blockUser,
  unblockUser,
};

export default userController;
