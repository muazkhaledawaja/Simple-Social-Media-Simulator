/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { FriendRequest } from './friend-request.model';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendRequestService } from './friend-request.service';
import { Users } from '../users/user.model';
import { User ,CheckBlocked} from 'common/decorators';

@Controller('friend-request')
export class FriendRequestController {
    constructor(private friendRequestService: FriendRequestService) { }

    @Post()
    async createFriendRequest(
      @Body() friendRequestDto: FriendRequestDto,
      @CheckBlocked()  any,
    ): Promise<FriendRequest> {
      try {
        return await this.friendRequestService.createFriendRequest(friendRequestDto);
      } catch (error) {
        throw new HttpException(`Failed to create friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    
    @Get(':recipientId')
    async findFriendRequestByRecipient(
        @Param('recipientId') recipientId: number,
        @CheckBlocked() any ,

    ): Promise<FriendRequest[]> {
        try {
            return await this.friendRequestService.findFriendRequestByRecipient(recipientId);
        } catch (error) {
            throw new HttpException(`Failed to find friend request by recipient: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':requestId/accept')
    @HttpCode(HttpStatus.NO_CONTENT)
    async acceptFriendRequest(
        @Param('requestId') requestId: number
    ): Promise<any> {
        try {
            return await this.friendRequestService.acceptFriendRequest(requestId);
        } catch (error) {
            throw new HttpException(`Failed to accept friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':requestId/decline')
    @HttpCode(HttpStatus.NO_CONTENT)
    async declineFriendRequest(
        @Param('requestId') requestId: number
    ): Promise<number> {
        try {
            return await this.friendRequestService.declineFriendRequest(requestId);
        } catch (error) {
            throw new HttpException(`Failed to decline friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("all/:userId")
    async getFriendRequests(
        @User() user: Users,
        @CheckBlocked() any ,
        ) {
        try {
            return await this.friendRequestService.findFriendRequestBySender(user.id);
        } catch (error) {
            throw new HttpException(`Failed to view all friend requests: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':requestId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFriendRequest(
        @Param('requestId') requestId: number
    ): Promise<number> {
        try {
            return await this.friendRequestService.deleteFriendRequest(requestId);
        } catch (error) {
            throw new HttpException(`Failed to delete friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
