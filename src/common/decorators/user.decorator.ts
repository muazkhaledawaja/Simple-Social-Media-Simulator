/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/modules/users/user.model';
 

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): Users => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
