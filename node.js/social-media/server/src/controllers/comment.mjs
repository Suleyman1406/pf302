import Comment from "../mongoose/schemas/comment.mjs";
import Post from "../mongoose/schemas/post.mjs";

const BASE_URL = process.env.BASE_URL;

const getAll = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post: postId,
    }).populate("user", "name email avatar");

    const items = comments.map((comment) => ({
      _id: comment._id,
      content: comment.content,
      user: {
        _id: comment.user._id,
        name: comment.user.name,
        avatar: comment.user.avatar
          ? `${BASE_URL}${comment.user.avatar}`
          : null,
      },
      createdAt: comment.createdAt,
    }));

    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const { content } = req.matchedData;
    const { postId } = req.params;
    const user = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      post: postId,
      user,
      content,
    });

    await comment.save();

    res.status(201).json({ message: "Comment created", item: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.matchedData;

    const comment = await Comment.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { content },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment updated", item: comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json({ message: "Comment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const commentController = {
  getAll,
  create,
  update,
  remove,
};

export default commentController;
