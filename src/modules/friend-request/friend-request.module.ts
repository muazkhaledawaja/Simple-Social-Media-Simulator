/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';
import { friendRequestProvider } from './friend-request.providers';
import { BlockService } from 'modules/Block/block.service';
import { blockProvider } from 'modules/Block/block.providers';
import { UserService } from 'modules/users/user.service';
import { userProvider } from 'modules/users/user.provider';

@Module({
    controllers: [FriendRequestController],
    providers: [FriendRequestService , ...friendRequestProvider,
    BlockService, ...blockProvider,
    UserService, ...userProvider
    ],
    exports: [FriendRequestService],
})
export class FriendRequestModule { }
