/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';

@Module({
  providers: [...commentProvider, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
