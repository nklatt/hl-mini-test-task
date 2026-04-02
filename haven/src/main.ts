import { ClassSerializerInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { GlobalValidationPipe } from "./utils/global-validation.pipe";
import { PrismaExceptionFilter } from "./utils/prisma-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    allowedHeaders: [
      "Accept",
      "Authorization",
      "Content-Type",
      "Origin",
      "X-Requested-With",
    ],
    origin: [
      configService.getOrThrow("NEXT_PUBLIC_FRONTEND_URL"),
      configService.getOrThrow("NEXT_PUBLIC_HAVEN_URL"),
    ],
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new GlobalValidationPipe());

  app.use(cookieParser());

  await app.listen(2337);
}

bootstrap();
