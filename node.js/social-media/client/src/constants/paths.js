export const PATHS = {
  FEED: "/feed",
  DISCOVER: "/",
  SAVED: "/saved",
  INVITES: "/invites",
  SEARCH: "/search",
  PROFILE: "/profile",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  CHAT: "/chat",
  CONVERSATION: "/chat/:id",
};

export const unauthenticatedRoutes = [
  PATHS.LOGIN,
  PATHS.REGISTER,
  PATHS.FORGOT_PASSWORD,
  PATHS.RESET_PASSWORD,
];
