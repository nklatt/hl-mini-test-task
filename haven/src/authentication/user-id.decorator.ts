import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return Number(request.user?.id ?? 0);
  },
);
