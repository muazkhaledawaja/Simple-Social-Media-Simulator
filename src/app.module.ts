/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UserModule } from './modules/users/user.module';
import { CommentModule } from './modules/comments/comment.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/posts/post.module';
import { FriendRequestModule } from './modules/friend-request/friend-request.module';
import { BlockModule } from './modules/Block/block.module';


import config from '../config';
import { AuthGuard } from 'common/guards';
 
@Module({
  imports: [
    UserModule,
    CommentModule,
    DatabaseModule,
    PostModule,
    FriendRequestModule,
    BlockModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
  
    }),
  ],
   providers:[
     AuthGuard,
  ]
})
export class AppModule {}
