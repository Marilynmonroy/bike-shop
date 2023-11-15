import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (filter) {
      return request.user[filter];
    } else {
      throw new NotFoundError('Usuário não encontrado. AuthGuard');
    }
  },
);
