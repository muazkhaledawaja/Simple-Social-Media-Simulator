/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './../users/user.module';


import { CommentModule } from '../comments/comment.module';

import { PostController } from './post.controller';
import { postProvider } from './post.provider';
import { PostService } from './post.service';
import { BlockGuard } from 'common/guards';
import { blockProvider } from 'modules/Block/block.providers';
import { BlockInterceptor } from 'common/interceptor/block.interceptor';


@Module({
  imports: [CommentModule, UserModule],
  controllers: [PostController],
  providers: [
    PostService, ...postProvider,BlockGuard,...blockProvider],
  exports: [PostService],

})
export class PostModule { }