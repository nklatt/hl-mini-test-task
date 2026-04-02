import { type OnModuleInit, Optional } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

type LogLevel = "query" | "info" | "warn" | "error";

export interface PrismaServiceConfig {
  datasources?: {
    db: { url: string };
  };
  log?: LogLevel[];
}

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Optional() configuration: PrismaServiceConfig) {
    super(configuration);
  }

  async onModuleInit() {
    const maxTries = 3;
    const retryDelay = 2000;

    for (let attempt = 1; attempt <= maxTries; attempt++) {
      try {
        await this.$connect();
        return;
      } catch (error) {
        if (attempt === maxTries) {
          throw error;
        }
        console.warn(
          `Prisma connection attempt ${attempt} failed. Retrying in ${retryDelay}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}
