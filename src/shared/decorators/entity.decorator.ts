import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { getConnection } from 'typeorm';
import { formatResponse } from '../../utils';

export const Entity = createParamDecorator(
  async (type: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const primaryKey = Object.keys(request.params)[0];
    const value = request.params[primaryKey];

    const entity = await getConnection()
      .getRepository(type)
      .findOne({
        [primaryKey]: value,
      });

    if (!entity) {
      throw new HttpException(formatResponse('Entity not found'), 404);
    }

    return entity;
  },
);
