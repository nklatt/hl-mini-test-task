import type { users } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

import { IsId } from "../decorators/is-id.decorator";
import { Trim } from "../decorators/Trim.decorator";
import { role } from "../PrismaEnums";

export class UserEntity {
  constructor(input: UserEntity) {
    Object.assign(this, input);
  }

  static fromPrisma(u: users): UserEntity {
    return new UserEntity({
      id: u.id,
      first: u.first || "",
      last: u.last || "",
      role: u.role as role,
    });
  }

  @IsId()
  id: number;

  @Trim()
  @IsString()
  first: string;

  @Trim()
  @IsString()
  last: string;

  @IsEnum(role)
  role: role;
}
