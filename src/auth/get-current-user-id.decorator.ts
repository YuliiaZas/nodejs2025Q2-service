import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JwtPayload } from './interfaces/jwt-payload.type';

export const GetCurrentUserId = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user?.sub;
  },
);
