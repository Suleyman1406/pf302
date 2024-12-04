import User from "../mongoose/schemas/user.mjs";

const update = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.matchedData;

    const user = await User.findById(userId).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      user.name = name;
    }
    if (req.file) {
      user.avatar = req.file.path;
    }

    await user.save();

    res.status(200).json({ message: "User updated", item: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const userController = { update };

export default userController;
