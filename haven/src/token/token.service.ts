import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { Request, Response } from "express";

import type { UserTokenV2 } from "src/hl-common/api/UserToken";
import type { UserEntity } from "src/hl-common/entities/Users";

const AUTH_COOKIE_NAME = "mini-jwt";

@Injectable()
export class TokenService {
  private readonly cookieDomain: string;
  private readonly cookieSecure: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.cookieDomain = this.configService.getOrThrow("AUTH_COOKIE_DOMAIN");
    this.cookieSecure =
      this.configService.getOrThrow("AUTH_COOKIE_SECURE") === "true";
  }

  getCredentialsFromJwt(token: string): UserTokenV2 {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (_error) {
      throw new Error("Invalid token");
    }

    if (payload.v === 2) {
      if (!payload?.id || !payload?.role) {
        throw new Error("invalid token payload");
      }

      return {
        v: payload.v,
        id: payload.id,
        role: payload.role,
      };
    }

    throw new Error("invalid token version");
  }

  sign(payload: UserTokenV2): string {
    return this.jwtService.sign(payload);
  }

  setJwtCookie(response: Response, user: UserEntity) {
    const payload: UserTokenV2 = {
      v: 2,
      id: user.id,
      role: user.role,
    };
    const jwt = this.jwtService.sign(payload);

    response.cookie(AUTH_COOKIE_NAME, jwt, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
  }

  clearCookie(response: Response) {
    response.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      sameSite: "lax",
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
  }

  getAuthCookie(request: Request): string | undefined {
    return request.cookies?.[AUTH_COOKIE_NAME];
  }
}
