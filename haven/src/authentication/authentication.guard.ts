import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";

import type { UserTokenV2 } from "src/hl-common/api/UserToken";
import { TokenService } from "../token/token.service";
import {
  type AccessControl,
  AccessControlKey,
  PublicAccess,
} from "./access-control";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessControl = this.reflector.get<AccessControl>(
      AccessControlKey,
      context.getHandler(),
    );

    if (!accessControl) {
      throw new Error(
        "No access control specified for this endpoint. Use @Route(AccessControl) to specify access control.",
      );
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.tokenService.getAuthCookie(request);

    let user: UserTokenV2 | null = null;
    if (token) {
      try {
        user = this.tokenService.getCredentialsFromJwt(token);
      } catch (_e) {
        if (!(accessControl instanceof PublicAccess)) {
          throw new UnauthorizedException("Missing or invalid credentials");
        }
      }
    }

    if (user) {
      // biome-ignore lint/complexity/useLiteralKeys: Express best practice
      request["user"] = user;
    }

    return accessControl.canActivate(user, request.params);
  }
}
