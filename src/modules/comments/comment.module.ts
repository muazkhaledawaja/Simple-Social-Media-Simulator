/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { blockProvider } from 'modules/Block/block.providers';
import { postProvider } from 'modules/posts/post.provider';
import { BlockInterceptor } from 'common/interceptor/block.interceptor';





@Module({
  controllers: [CommentController],

  providers: [ ...commentProvider, CommentService,...blockProvider,...postProvider],
  exports: [CommentService],
})
export class CommentModule { }