/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';
import { friendRequestProvider } from './friend-request.providers';

@Module({
    controllers: [FriendRequestController],
    providers: [FriendRequestService , ...friendRequestProvider],
    exports: [FriendRequestService],
})
export class FriendRequestModule { }
