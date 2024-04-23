import { JwtPayload } from "../types/users.type";

export function userIdByRole(user?: JwtPayload, userParamsId?: number): number {
  let userId: number | null = user.id;

  if (!user && !userParamsId) {
    throw new Error("No user id provided");
  }

  if (user.role === "admin") {
    userId = userParamsId;
  }

  if (user.role === "user") {
    userId = user.id;
  }

  return userId;
}
