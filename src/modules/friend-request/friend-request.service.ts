/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable,Inject } from "@nestjs/common";
import { FriendRequest } from "./friend-request.model";
import { FriendRequestDto } from "./dto/friend-request.dto";
import { PROVIDERS } from 'common/constants';

@Injectable()
export class FriendRequestService {
    constructor(
        @Inject(PROVIDERS.FRIEND_REQUEST_PROVIDER)
        private readonly friendRequestRepository: typeof FriendRequest,
    ) { }

    //function to create new friend request
    async createFriendRequest(friendRequestDto: FriendRequestDto): Promise<FriendRequest> {
        try {
            const { senderId, recipientId } = friendRequestDto;
            if (!recipientId) {
                throw new Error('recipientId is required');
            }
            return this.friendRequestRepository.create({ senderId, recipientId });
        } catch (error) {
            throw new Error(`Failed to create friend request: ${error.message}`);
        }
    }

    //function to find friend request by recipient
    async findFriendRequestByRecipient(recipientId: number): Promise<FriendRequest[]> {
        try{
        return this.friendRequestRepository.findAll({ where: { recipientId } });
        }catch(err){
            throw new Error(`Failed to find friend request by recipient: ${err.message}`);
        }
    }

    // function to accept friend request
    async acceptFriendRequest(requestId: number): Promise<any> {
        try {
            return this.friendRequestRepository.update(
                { isAccepted: true,status: 'accepted' },
                { where: { id: requestId } ,
            }
            )
        } catch (error) {
            throw new Error(`Failed to accept friend request: ${error.message}`);
        }
  
    }

    // function to decline friend request
    async declineFriendRequest(requestId: number): Promise<any> {
        try {
        return this.friendRequestRepository.update(   
            { isAccepted: false,status: 'declined' },
            { where: { id: requestId } });
            
        } catch (error) {
            throw new Error(`Failed to decline friend request: ${error.message}`);
        }
    }

    // function to view all friend requests by sender id
    async findFriendRequestBySender(senderId: number): Promise<FriendRequest[]> {
        try {
            return this.friendRequestRepository.findAll({ where: { senderId } });
        } catch (error) {
            throw new Error(`Failed to find friend request by sender: ${error.message}`);
        }
    }
 
    // delete friend request
    async deleteFriendRequest(requestId: number): Promise<any> {
        try {
        return this.friendRequestRepository.destroy({ where: { id: requestId } });
            
        } catch (error) {
            throw new Error(`Failed to delete friend request: ${error.message}`);
        }
    }

    // function to unfriend
    async unfriend(requestId: number): Promise<any> {
        try {
        return this.friendRequestRepository.update(   
            { isAccepted: false,status: 'unfriended' },
            { where: { id: requestId } });
            
        } catch (error) {
            throw new Error(`Failed to unfriend: ${error.message}`);
        }
    }

}