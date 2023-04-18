/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';
import { BlockService } from 'modules/Block/block.service';
import { blockProvider } from 'modules/Block/block.providers';
import { FriendRequestService } from 'modules/friend-request/friend-request.service';
import { friendRequestProvider } from 'modules/friend-request/friend-request.providers';
import { BlockInterceptor } from 'common/interceptor/block.interceptor';

@Module({

  controllers: [UserController],
  providers: [...userProvider, UserService,
    BlockService, ...blockProvider,
    FriendRequestService, ...friendRequestProvider],
  exports: [UserService],
})
export class UserModule { }
