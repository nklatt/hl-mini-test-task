import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthenticationModule } from "./authentication/authentication.module";
import { CardsModule } from "./cards/cards.module";
import { CoursesModule } from "./courses/courses.module";
import { EventsModule } from "./events/events.module";
import { ModulesModule } from "./modules/modules.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TokenModule } from "./token/token.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TokenModule,
    AuthenticationModule,
    UsersModule,
    CoursesModule,
    ModulesModule,
    CardsModule,
    EventsModule,
  ],
})
export class AppModule {}
