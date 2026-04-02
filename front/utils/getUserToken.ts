import { jwtVerify } from "jose";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import type { UserTokenV2 } from "@/hl-common/api/UserToken";

const AUTH_COOKIE_NAME = "mini-jwt";
const secret = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

export const getUserTokenFromRequest = async (request: NextRequest) =>
  getUserFromCookieStore(request.cookies);

export const getUserTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return getUserFromCookieStore(cookieStore);
};

export const requireUserTokenFromCookies = async (): Promise<UserTokenV2> => {
  const userToken = await getUserTokenFromCookies();
  if (!userToken) {
    redirect("/login");
  }
  return userToken;
};

const getUserFromCookieStore = async (
  cookieStore: RequestCookies | ReadonlyRequestCookies,
) => {
  const cookie = cookieStore.get(AUTH_COOKIE_NAME);
  if (!cookie?.value) {
    return null;
  }
  return parseUserToken(cookie.value);
};

const parseUserToken = async (token: string): Promise<UserTokenV2 | null> => {
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (typeof payload === "object" && payload.v === 2) {
      return payload as UserTokenV2;
    }
  } catch (_error) {
    // invalid token
  }

  return null;
};
