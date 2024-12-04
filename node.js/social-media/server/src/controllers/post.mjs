import Post from "../mongoose/schemas/post.mjs";

const getAll = async (req, res) => {
  try {
    const { sort, search, page = 1, limit = 10 } = req.query;
    const sortObj = {};
    const filter = {
      $or: [],
    };

    if (sort) {
      const [field, order] = sort.split("-");
      sortObj[field] = order === "asc" ? 1 : -1;
    }
    if (search) {
      filter.$or.push({ title: { $regex: search, $options: "i" } });
      filter.$or.push({ content: { $regex: search, $options: "i" } });
      filter.$or.push({ tags: { $regex: search, $options: "i" } });
    }

    const data = await Post.find(filter)
      .sort(sortObj)
      .limit(+limit)
      .skip((+page - 1) * +limit)
      .populate("user", "name email avatar");

    const count = await Post.countDocuments(filter);

    const items = data.map((item) => {
      return {
        ...item.toObject(),
        imageUrl: `${process.env.BASE_URL}${item.imageUrl}`,
        user: {
          name: item.user.name,
          email: item.user.email,
          avatar: item.user.avatar
            ? `${process.env.BASE_URL}${item.user.avatar}`
            : null,
          _id: item.user._id,
        },
      };
    });

    res.status(200).json({
      message: "Posts fetched successfully",
      limit: +limit,
      page: +page,
      count,
      items,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const { tags, title, content } = req.matchedData;

    const tagsArray = tags?.split(",") ?? [];
    const imageUrl = req.file.path;
    const data = {
      title,
      content,
      imageUrl,
      tags: tagsArray,
      user: req.user.id,
    };
    const post = new Post(data);

    await post.save();

    res.status(201).json({ message: "Post created", item: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags, title, content } = req.matchedData;

    const imageUrl = req.file?.path || null;
    const tagsArray = tags?.split(",") ?? [];

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (req.user.id !== post.user.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    post.title = title;
    post.content = content;
    post.tags = tagsArray;
    post.updatedAt = new Date();
    if (imageUrl) {
      post.imageUrl = imageUrl;
    }
    await post.save();

    res.status(200).json({ message: "Post updated", item: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOneAndDelete({ _id: id, user: req.user.id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const like = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((item) => item.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.status(200).json({ message: `Post ${isLiked ? "Disliked" : "Liked"}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const postController = {
  getAll,
  create,
  update,
  remove,
  like,
};

export default postController;
