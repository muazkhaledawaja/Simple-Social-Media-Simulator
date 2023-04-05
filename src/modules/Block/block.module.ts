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


@Module({
   imports: [UserModule ],
    controllers: [BlockController],
    providers: [
        BlockService , ...blockProvider,
        PostService,...postProvider,
        CommentService,...commentProvider,BlockGuard
    ],
    exports: [BlockService],
  
})
export class BlockModule { }