import { BadRequestException, Body, Controller, Res } from "@nestjs/common";
import { role } from "@prisma/client";
import type { Response } from "express";

import { Public, RequiresPrivilege } from "src/authentication/access-control";
import type { API } from "src/hl-common/api/API";
import { ApiRes, ApiResSuccess } from "src/hl-common/api/Response";
import { UserEntity } from "src/hl-common/entities/Users";
import { UsersService } from "src/users/users.service";
import { Route } from "src/utils/route.decorator";
import { TokenService } from "../token/token.service";
import { AuthenticationService } from "./authentication.service";
import { UserId } from "./user-id.decorator";

@Controller()
export class AuthenticationController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Route(Public())
  async sendOtp(@Body() { phone }: API.sendOtp.body): API.sendOtp.resp {
    const user = await this.usersService.findOrCreateByPhone(phone);
    await this.authService.createAuthChallenge(user.id);
    return new ApiRes({ success: true });
  }

  @Route(Public())
  async verifyOtp(
    @Res({ passthrough: true }) response: Response,
    @Body() { phone, otp }: API.verifyOtp.body,
  ): API.verifyOtp.resp {
    const prismaUser = await this.usersService.findByPhone(phone);

    if (!prismaUser) {
      throw new BadRequestException("User not found");
    }

    const authChallenge = await this.authService.findAuthChallenge(
      prismaUser.id,
      otp,
    );

    if (!authChallenge) {
      throw new BadRequestException("Invalid or expired code.");
    }

    const user = UserEntity.fromPrisma(prismaUser);
    this.tokenService.setJwtCookie(response, user);

    return new ApiRes({
      user,
      needsRegistration: !prismaUser.first,
    });
  }

  @Route(RequiresPrivilege(role.registered))
  async register(
    @UserId() userId: number,
    @Body() { first, last }: API.register.body,
  ): API.register.resp {
    const prismaUser = await this.usersService.setName(userId, first, last);
    return new ApiRes(UserEntity.fromPrisma(prismaUser));
  }

  @Route(Public())
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): API.logout.resp {
    this.tokenService.clearCookie(response);
    return new ApiResSuccess(true);
  }
}
