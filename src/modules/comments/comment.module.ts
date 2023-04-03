/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { BlockGuard } from '../../common/guards';
import { blockProvider } from 'modules/Block/block.providers';



@Module({
  controllers: [CommentController],

  providers: [
    ...commentProvider, CommentService,
    BlockGuard, ...blockProvider
  ],
  exports: [CommentService],
})
export class CommentModule { }
