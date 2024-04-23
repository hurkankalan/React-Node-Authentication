import { JwtPayload } from "../types/users.type";

export function userIdByRole(
  user: JwtPayload,
  userParamsId?: number | undefined
): number {
  let userId: number = user.id;

  if (userParamsId) {
    userId = userParamsId;
  }

  return userId;
}
