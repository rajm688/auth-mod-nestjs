import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from 'src/entities/auth.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.user);
    return req.user;
  },
);
