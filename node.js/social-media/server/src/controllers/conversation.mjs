import Conversation from "../mongoose/schemas/conversation.mjs";
import User from "../mongoose/schemas/user.mjs";

const getAll = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1 user2", "name email")
      .populate("messages");

    res.status(200).json({
      message: "Conversations fetched successfully",
      items: conversations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const userId = req.user._id;

    if (userId === receiverId) {
      return res.status(400).json({ message: "You cannot message yourself" });
    }

    const userExist = await User.findById(receiverId);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    let conversation = await Conversation.findOne({
      $or: [
        { user1: receiverId, user2: userId },
        { user1: userId, user2: receiverId },
      ],
    })
      .populate("user1 user2", "name email")
      .populate("messages")
      .populate("messages.user", "name email");

    if (conversation) {
      return res.status(200).json({
        message: "Conversation found",
        item: conversation,
      });
    }

    conversation = await Conversation.create({
      user1: userId,
      user2: receiverId,
    });

    res
      .status(200)
      .json({ message: "Conversation created", item: conversation });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const conversationController = {
  getAll,
  getUserConversation,
};

export default conversationController;
