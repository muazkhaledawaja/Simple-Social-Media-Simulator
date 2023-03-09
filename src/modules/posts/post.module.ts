/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { CommentModule } from '../comments/comment.module';

import { PostController } from './post.controller';
import { postProvider } from './post.provider';
import { PostService } from './post.service';

@Module({
  imports: [CommentModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider],
  exports: [PostService],
})
export class PostModule {}
