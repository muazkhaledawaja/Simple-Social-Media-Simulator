/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { BlockDto } from '../../modules/Block/dto/block.dto';
import { PROVIDERS } from 'common/constants';
import { Block } from 'modules/Block/block.model';

@Injectable()
export class BlockGuard implements CanActivate {
  constructor(   @Inject(PROVIDERS.BLOCK_PROVIDER)
  private readonly blockRepository: typeof Block,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const blockDto: BlockDto = { blockerId: request.user.id, blockedId: request.params.id };

    try {
      const count = await this.blockRepository.count({
        where: { blockerId: blockDto.blockerId, blockedId: blockDto.blockedId },
      });

      return count === 0;
    } catch (error) {
      throw new Error(`Failed to check if user is blocked: ${error.message}`);
    }
  }
}
