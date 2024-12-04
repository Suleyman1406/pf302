import passport from "passport";

export const authorize = () => {
  return async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      next();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error!" });
    }
  };
};

export const authenticate = (req, res, next) =>
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ message: "Internal server error!" });
    }
    if (info?.error || !user) {
      return res.status(401).json({ message: info?.error || "Unauthorized!" });
    }

    req.login(user, function (err) {
      if (err) {
        return res.status(500).json({ message: "Internal server error!" });
      }
      next();
    });
  })(req, res, next);
