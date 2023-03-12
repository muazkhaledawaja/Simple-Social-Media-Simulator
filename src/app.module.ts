/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UserModule } from './modules/users/user.module';
import { CommentModule } from './modules/comments/comment.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/posts/post.module';

import config from 'config';

@Module({
  imports: [
    UserModule,
    CommentModule,
    PostModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
  
    }),
  ],
  providers: [ DatabaseModule,],
})
export class AppModule {}
