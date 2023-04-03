/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BlockDto } from 'modules/Block/dto/block.dto';


export const Block = createParamDecorator(
    async (_, context: ExecutionContext): Promise<BlockDto> => {
      const request = context.switchToHttp().getRequest();
      const blockerId = request.user.id;
      const blockedId = request.params.userId;
      return { blockerId, blockedId };
    },
  );