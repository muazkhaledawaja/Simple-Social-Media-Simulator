/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './../users/user.module';


import { CommentModule } from '../comments/comment.module';

import { PostController } from './post.controller';
import { postProvider } from './post.provider';
import { PostService } from './post.service';

import { AuthGuard } from '../../common/guards';

@Module({
  imports: [CommentModule, UserModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider,AuthGuard],
  exports: [PostService],
  
})
export class PostModule {}
