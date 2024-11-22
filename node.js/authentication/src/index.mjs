import express from "express";
import "./config/db.mjs";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

import authRoutes from "./routes/auth.mjs";
import reservationRoutes from "./routes/reservations.mjs";
import usersRoutes from "./routes/users.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/reservations", reservationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
