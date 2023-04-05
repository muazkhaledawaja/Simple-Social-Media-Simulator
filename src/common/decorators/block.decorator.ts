/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Block } from 'modules/Block/block.model';
import { Posts } from 'modules/posts/post.model';

export const CheckBlocked = createParamDecorator(async (_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const blockedId = request.user.id;
  const postId = request.params.postId;

  try {
    const post = await Posts.findOne({ where: { id: postId } });

    if (!post) {
      throw new Error('Post not found');
    }

    const blockerId = post.userId;

    const count = await Block.count({
      where: { blockerId, blockedId },
    });

    if (count > 0) {
      throw new ForbiddenException('Access denied');
    }
  } catch (error) {
    if (error instanceof ForbiddenException) {
      throw error;
    }
    
    throw new Error(`Failed to check if user is blocked: ${error.message}`);
  }
});
