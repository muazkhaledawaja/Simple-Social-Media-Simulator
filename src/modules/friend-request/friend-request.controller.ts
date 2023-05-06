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
import { User } from 'common/decorators';

@Controller('friend-request')
export class FriendRequestController {
    constructor(private friendRequestService: FriendRequestService) { }

    @Post()
    async createFriendRequest(
        @Body() friendRequestDto: FriendRequestDto,
        @User() user: { id: number },
    ): Promise<FriendRequest> {
        try {
            return await this.friendRequestService.createFriendRequest(friendRequestDto, user.id);
        } catch (error) {
            throw new HttpException(`Failed to create friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get(':recipientId')
    async findFriendRequestByRecipient(
        @Param('recipientId') recipientId: number,
        @User() user: { id: number },

    ): Promise<FriendRequest[]> {
        try {
            return await this.friendRequestService.findFriendRequestByRecipient(recipientId, user.id);
        } catch (error) {
            throw new HttpException(`Failed to find friend request by recipient: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // api to accept friend request
    @Put(':requestId/accept')
    @HttpCode(HttpStatus.NO_CONTENT)
    async acceptFriendRequest(
        @Param('requestId') requestId: number,
        @User() user: { id: number },
    ): Promise<any> {
        try {
            return await this.friendRequestService.acceptFriendRequest(requestId, user.id);
        } catch (error) {
            throw new HttpException(`Failed to accept friend request: ${error.message}`, HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
    // api to decline friend request

    @Put(':requestId/decline')
    @HttpCode(HttpStatus.NO_CONTENT)
    async declineFriendRequest(
        @Param('requestId') requestId: number,
        @User() user: { id: number },

    ): Promise<number> {
        try {
            return await this.friendRequestService.declineFriendRequest(requestId, user.id);
        } catch (error) {
            throw new HttpException(`Failed to decline friend request: ${error.message}`, HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @Get("all/:senderId")
    async getFriendRequests(
        @Param('senderId') senderId: number,
        @User() user: { id: number },
    ) {
        try {
            return await this.friendRequestService.findFriendRequestBySender(senderId, user.id);
        } catch (error) {
            throw new HttpException(`Failed to view all friend requests: ${error.message}`, HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @Delete(':requestId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteFriendRequest(
        @Param('requestId') requestId: number,
        @User() user: { id: number },

    ): Promise<number> {
        try {
            return await this.friendRequestService.deleteFriendRequest(requestId, user.id);
        } catch (error) {
            throw new HttpException(`Failed to delete friend request: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
