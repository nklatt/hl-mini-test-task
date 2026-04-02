import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { PrismaModule } from "src/prisma/prisma.module";
import { TokenModule } from "src/token/token.module";
import { UsersModule } from "src/users/users.module";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationGuard } from "./authentication.guard";
import { AuthenticationService } from "./authentication.service";

@Module({
  imports: [PrismaModule, TokenModule, UsersModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
