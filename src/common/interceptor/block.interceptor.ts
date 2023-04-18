/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestInterceptor, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PROVIDERS } from 'common/constants';
import { Block } from 'modules/Block/block.model';
import { Posts } from 'modules/posts/post.model';
import { ERRORS } from 'common/constants';

@Injectable()
export class BlockInterceptor implements NestInterceptor {
  constructor(
    @Inject(PROVIDERS.BLOCK_PROVIDER) private readonly blockRepository: typeof Block,
    @Inject(PROVIDERS.POSTS_PROVIDER) private readonly postRepository: typeof Posts,
  ) {}

  async intercept(context: ExecutionContext): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const blockedId = request.user.id;
    const postId = request.params.postId;

    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error(ERRORS.POST.NOT_FOUND); 
    }

    const blockerId = post.userId;
    const count = await this.blockRepository.count({ where: { blockerId, blockedId } });
    if (count > 0) {
      console.log(11111111111,count)
      
      throw new ForbiddenException(ERRORS.USER.NOT_AUTHORIZED);
    }

    return null;
  }
}