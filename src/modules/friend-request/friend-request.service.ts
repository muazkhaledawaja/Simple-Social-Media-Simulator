/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, Inject, HttpException } from "@nestjs/common";
import { FriendRequest } from "./friend-request.model";
import { FriendRequestDto } from "./dto/friend-request.dto";
import { ERRORS, PROVIDERS } from 'common/constants';
import { Block } from "modules/Block/block.model";
@Injectable()
export class FriendRequestService {
    constructor(
        @Inject(PROVIDERS.FRIEND_REQUEST_PROVIDER)
        private readonly friendRequestRepository: typeof FriendRequest,
         @Inject(PROVIDERS.BLOCK_PROVIDER)
        private readonly blockRepository: typeof Block,
    ) { }

    //function to create new friend request
    async createFriendRequest(friendRequestDto: FriendRequestDto, userId: number): Promise<FriendRequest> {
        try {
            const { senderId, recipientId } = friendRequestDto;
            // check if senderId is provided
            if (!senderId) {
                throw new Error('senderId is required');
            }
            // check if recipientId is provided
            if (!recipientId) {
                throw new Error('recipientId is required');
            }
            // check if sender is authorized
            if (senderId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }
            // check if sender and recipient are the same
            if (senderId === recipientId) {
                throw new Error('senderId and recipientId cannot be the same');
            }

            // check if friend request already exists
            const existingFriendRequest = await this.friendRequestRepository.findOne({
                where: {
                    senderId,
                    recipientId,
                },
            });
            if (existingFriendRequest) {
                throw new Error('Friend request already exists');
            }
            // check if the users are blocked
            const blocked = await this.blockRepository.findOne({ where: { blockerId: senderId, blockedId: recipientId } });
            if (blocked) {
                throw new HttpException(ERRORS.BLOCK.BLOCKED, 404);
            }
       
            return this.friendRequestRepository.create({ senderId, recipientId });
        } catch (error) {
            throw new Error(`Failed to create friend request: ${error.message}`);
        }
    }

    // function to view all friend requests by sender id
    async findFriendRequestBySender(senderId: number, userId: number): Promise<FriendRequest[]> {
        try {
            // check if recipientId is provided
            if (!senderId) {
                throw new Error('senderId is required');
            }
            // check if sender is authorized
            if (senderId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }
            return this.friendRequestRepository.findAll({ where: { senderId } });
        } catch (error) {
            throw new Error(`Failed to find friend request by sender: ${error.message}`);
        }
    }


    //function to find friend request by recipient
    async findFriendRequestByRecipient(recipientId: number, userId: number): Promise<FriendRequest[]> {
        try {
            // check if recipientId is provided
            if (!recipientId) {
                throw new Error('recipientId is required');
            }
            // check if recipient is authorized
            if (recipientId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }
            return this.friendRequestRepository.findAll({ where: { recipientId } });
        } catch (err) {
            throw new Error(`Failed to find friend request by recipient: ${err.message}`);
        }
    }

    // function to accept friend request
    async acceptFriendRequest(requestId: number, userId: number): Promise<any> {
        try {
            const FR = await this.friendRequestRepository.findByPk(requestId);
            // check if user is authorized
            if (FR.recipientId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }
            return this.friendRequestRepository.update(
                { isAccepted: true, status: 'accepted' },
                {
                    where: { id: requestId },
                }
            )
        } catch (error) {
            throw new Error(`Failed to accept friend request: ${error.message}`);
        }

    }

    // function to decline friend request
    async declineFriendRequest(requestId: number, userId: number): Promise<any> {
        try {
            const FR = await this.friendRequestRepository.findByPk(requestId);
            if (FR.recipientId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }
            return this.friendRequestRepository.update(
                { isAccepted: false, status: 'declined' },
                { where: { id: requestId } });

        } catch (error) {
            throw new Error(`Failed to decline friend request: ${error.message}`);
        }
    }


    // delete friend request
    async deleteFriendRequest(requestId: number, userId: number): Promise<any> {
        try {

            const FR = await this.friendRequestRepository.findByPk(requestId);

            // only the sender Or recipient can delete the request
            if (FR.senderId !== userId || FR.recipientId !== userId) {
                throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
            }

            return this.friendRequestRepository.destroy({ where: { id: requestId } });

        } catch (error) {
            throw new Error(`Failed to delete friend request: ${error.message}`);
        }
    }

    // function to unfriend
    async unfriend(requestId: number): Promise<any> {
        try {
            return this.friendRequestRepository.update(
                { isAccepted: false, status: 'unfriended' },
                { where: { id: requestId } });

        } catch (error) {
            throw new Error(`Failed to unfriend: ${error.message}`);
        }
    }


    // async blockFriendRequest(blockerId: number, blockedId: number,userId:number): Promise<any> {
    //     try {
    //         // find friend request
    //         const friendRequest = await this.friendRequestRepository.findOne({
    //             where: { senderId: blockerId || userId, recipientId: blockedId },
    //         });

    //         // check if user is authorized
    //         if (friendRequest.senderId !== blockerId || friendRequest.recipientId !== blockedId) {
    //             throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
    //         }

    //         // update the friend request status to "blocked"
    //         return this.friendRequestRepository.update(
    //             { status: 'blocked' },
    //             { where: { id: friendRequest.id } },
    //         );
    //     } catch (error) {
    //         throw new Error(`Failed to block friend request: ${error.message}`);
    //     }
    // }


}