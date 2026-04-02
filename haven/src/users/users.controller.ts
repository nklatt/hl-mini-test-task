import { Controller, NotFoundException } from "@nestjs/common";
import { role } from "@prisma/client";

import { RequiresPrivilege } from "src/authentication/access-control";
import { UserId } from "src/authentication/user-id.decorator";
import type { API } from "src/hl-common/api/API";
import { ApiRes } from "src/hl-common/api/Response";
import { UserEntity } from "src/hl-common/entities/Users";
import { Route } from "src/utils/route.decorator";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Route(RequiresPrivilege(role.registered))
  async getMe(@UserId() userId: number): API.getMe.resp {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return new ApiRes(UserEntity.fromPrisma(user));
  }
}
