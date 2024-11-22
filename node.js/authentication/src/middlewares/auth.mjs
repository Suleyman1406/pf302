import User from "../mongoose/schemas/user.mjs";

export const authorize = (options) => {
  const isAdmin = options?.isAdmin || false;
  return async (req, res, next) => {
    try {
      const userId = req.session.userId;
      if (!userId) return res.status(401).json({ message: "Unauthorized!" });
      const user = await User.findById(userId).select("-password");
      if (!user) return res.status(401).json({ message: "Unauthorized!" });
      if (user.isBlocked)
        return res.status(403).json({ message: "Your account blocked!" });
      if (isAdmin && user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied!" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };
};
