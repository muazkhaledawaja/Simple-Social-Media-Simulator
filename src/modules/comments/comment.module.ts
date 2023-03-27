/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],

  providers: [...commentProvider, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
