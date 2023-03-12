import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserJwtExtracted } from './interfaces/UserJwtExtracted';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user: UserJwtExtracted = request.user || {
      email: undefined,
      id: undefined,
    };
    return user.id;
  },
);
