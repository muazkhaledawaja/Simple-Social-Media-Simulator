/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
 
import { Block } from 'modules/Block/block.model';
import { Posts } from 'modules/posts/post.model';
 
export const CheckBlocked = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const blockedId = request.user.id;
    const postId = request.params.postId;

    try {
      const post = await Posts.findOne({ where: { id: postId } });
      if (!post) {
        return { blockedId, postId, isBlocked: false };
      }

      const blockerId = post.userId;

      const count = await Block.count({
        where: { blockerId, blockedId },
      });

 
      

      const isBlocked = count > 0;
      console.log('isBlocked', isBlocked);
      return { blockedId, blockerId, isBlocked };
    } catch (error) {
      throw new Error(`Failed to check if user is blocked: ${error.message}`);
    }
  },
);
