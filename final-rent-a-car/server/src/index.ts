import expressSession from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import express from "express";
import cors from "cors";

import "./config/db";
import "./config/auth-strategy";

import authRoutes from "./routes/auth";
import locationRoutes from "./routes/location";
import categoryRoutes from "./routes/category";
import rentRoutes from "./routes/rent";
import reservationRoutes from "./routes/reservation";
import reviewRoutes from "./routes/review";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("./public"));
app.use("/auth", authRoutes);
app.use("/locations", locationRoutes);
app.use("/categories", categoryRoutes);
app.use("/rents", rentRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reviews", reviewRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
