import { SetMetadata } from '@nestjs/common';

//Decorator sử dụng để truyền nhanh biến User từ controller sang service
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

//Decorator custom message của API
export const RESPONSE_MESSAGE = 'response_message'
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message)


