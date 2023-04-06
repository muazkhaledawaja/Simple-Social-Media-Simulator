/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlockController } from './block.controller';
import { BlockService } from './block.service';
import { blockProvider } from './block.providers';
import { UserModule } from './../users/user.module';
import { PostService } from 'modules/posts/post.service';
import { postProvider } from 'modules/posts/post.provider';
import { CommentService } from 'modules/comments/comment.service';
import { commentProvider } from 'modules/comments/comment.provider';
import { BlockGuard } from 'common/guards';
import { FriendRequestService } from 'modules/friend-request/friend-request.service';
import { friendRequestProvider } from 'modules/friend-request/friend-request.providers';

@Module({
   imports: [UserModule ],
    controllers: [BlockController],
    providers: [
        BlockService , ...blockProvider,
        PostService,...postProvider,
        CommentService,...commentProvider,
        FriendRequestService,...friendRequestProvider,
        BlockGuard
    ],
    exports: [BlockService],
  
})
export class BlockModule { }