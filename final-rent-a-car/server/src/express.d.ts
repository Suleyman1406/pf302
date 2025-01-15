import { IUser } from "./types/user";

declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      matchedData: Record<string, any>;
    }
  }
}
