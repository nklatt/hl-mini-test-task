import { randomInt } from "node:crypto";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";

const generateOtp = () => {
  return randomInt(1000000).toString().padStart(6, "0");
};

const otpLifetimeMs = 60 * 60 * 1000; // 1 hour
const oldestValidAuthChallenge = () => new Date(Date.now() - otpLifetimeMs);

@Injectable()
export class AuthenticationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAuthChallenge(userId: number) {
    const otp = generateOtp();
    console.log(`OTP for user ${userId}: ${otp}`);

    return this.prismaService.auth_challenges.upsert({
      where: { user_id: userId },
      update: { otp, created_at: new Date() },
      create: {
        user_id: userId,
        otp,
        expires_at: new Date(Date.now() + otpLifetimeMs),
      },
    });
  }

  async findAuthChallenge(userId: number, otp: string) {
    return this.prismaService.auth_challenges.findFirst({
      where: {
        user_id: userId,
        otp,
        created_at: { gte: oldestValidAuthChallenge() },
      },
    });
  }

  async cleanupAuthChallenges() {
    return this.prismaService.auth_challenges.deleteMany({
      where: { created_at: { lt: oldestValidAuthChallenge() } },
    });
  }
}
