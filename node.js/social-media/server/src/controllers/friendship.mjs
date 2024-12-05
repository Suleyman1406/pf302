import FriendShip from "../mongoose/schemas/friendship.mjs";
import User from "../mongoose/schemas/user.mjs";

const getAllRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const filter = {
      recipient: userId,
      status: "pending",
    };

    const requests = await FriendShip.find(filter)
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .populate("sender recipient", "name username email avatar");

    const count = await FriendShip.countDocuments(filter);

    res.status(200).json({
      message: "Follow requests fetched successfully",
      limit: +limit,
      page: +page,
      count,
      items: requests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientId } = req.params;

    if (senderId === recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send follow request to yourself" });
    }

    const request = await FriendShip.findOne({
      sender: senderId,
      recipient: recipientId,
    });

    if (request) {
      return res.status(400).json({ message: "Follow request already sent" });
    }

    const newRequest = new FriendShip({
      sender: senderId,
      recipient: recipientId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Follow request sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await FriendShip.findById(requestId)
      .populate("sender", "name username avatar")
      .populate("recipient", "name username avatar");

    if (!request) {
      return res.status(404).json({ message: "Follow request not found" });
    }

    if (request.recipient._id.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to accept or reject this request",
      });
    }

    request.status = "accepted";
    await request.save();

    await User.findByIdAndUpdate(request.sender._id, {
      $push: { friends: request.recipient._id },
    });
    await User.findByIdAndUpdate(request.recipient._id, {
      $push: { friends: request.sender._id },
    });

    res.status(200).json({ message: "Follow request accepted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await FriendShip.findByIdAndUpdate(requestId, {
      status: "rejected",
    });

    if (!request) {
      return res.status(404).json({ message: "Follow request not found" });
    }

    res.status(200).json({ message: "Follow request rejected" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { friends: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { friends: currentUserId },
    });

    res.status(200).json({ message: "Unfollowed user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const retractRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userId: senderId } = req.params;

    console.log("userId", userId);
    console.log("senderId", senderId);

    const request = await FriendShip.findOneAndDelete({
      sender: userId,
      recipient: senderId,
    });

    if (!request) {
      return res.status(404).json({ message: "Follow request not found" });
    }

    res.status(200).json({ message: "Follow request retracted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const inviteController = {
  getAllRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  removeFriend,
  retractRequest,
};

export default inviteController;
