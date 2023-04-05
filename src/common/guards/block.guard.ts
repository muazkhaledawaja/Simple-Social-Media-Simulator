/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'common/constants';
import { Block } from 'modules/Block/block.model';
import { Posts } from 'modules/posts/post.model';

@Injectable()
export class BlockGuard implements CanActivate {
    constructor(
        @Inject(PROVIDERS.BLOCK_PROVIDER)  private readonly blockRepository: typeof Block,
        @Inject(PROVIDERS.POSTS_PROVIDER) private readonly postRepository: typeof Posts,
        ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const blockedId = request.user.id;
        const postId = request.params.postId;

        try {
            const post = await this.postRepository.findOne({ where: { id: postId } });
            if (!post) {
                return false; // if post not found, return false
            }
            
            
            const blockerId = post.userId;

            const count = await this.blockRepository.count({
                where: { blockerId, blockedId },
            });

            console.log('count', count);
            

            return count === 0;
        } catch (error) {
            throw new Error(`Failed to check if user is blocked: ${error.message}`);
        }
    }
}
