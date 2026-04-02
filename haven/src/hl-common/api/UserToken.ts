import type { role } from "../PrismaEnums";

export type UserTokenV2 = {
  v: 2;
  id: number;
  role: role;
};
