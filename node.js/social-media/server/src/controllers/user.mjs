import User from "../mongoose/schemas/user.mjs";
import Friendship from "../mongoose/schemas/friendship.mjs";

export const USER_FRIENDSHIP_STATUS = {
  FRIEND: 0,
  PENDING: 1,
  STRANGER: -1,
};
const getAll = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const searchStr = search?.trim() || "";
    const filter = {
      $and: [
        {
          _id: { $ne: req.user._id },
        },
      ],
      $or: [],
    };

    if (searchStr) {
      filter.$or.push({ name: { $regex: searchStr, $options: "i" } });
      filter.$or.push({ username: { $regex: searchStr, $options: "i" } });
    }

    const users = await User.find(filter)
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .select("-password -resetPasswordToken -resetPasswordTokenExpires");

    const count = await User.countDocuments(filter);

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const isFriend = req.user.friends.includes(user._id);
      let hasAnyRequest = false;
      if (!isFriend) {
        hasAnyRequest = await Friendship.findOne({
          $or: [
            { recipient: user._id, sender: req.user._id },
            { recipient: req.user._id, sender: user._id },
          ],
          status: "pending",
        });
      }
      users[i] = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: isFriend
          ? USER_FRIENDSHIP_STATUS.FRIEND
          : hasAnyRequest
          ? USER_FRIENDSHIP_STATUS.PENDING
          : USER_FRIENDSHIP_STATUS.STRANGER,
      };
    }

    res.status(200).json({
      message: "Users fetched successfully",
      limit: +limit,
      page: +page,
      count,
      items: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

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

const userController = { update, getAll };

export default userController;
