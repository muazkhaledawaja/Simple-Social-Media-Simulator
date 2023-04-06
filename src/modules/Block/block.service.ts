/* eslint-disable prettier/prettier */
import { ERRORS, PROVIDERS } from 'common/constants';
import { Injectable, Inject, HttpException } from "@nestjs/common";
import { Block } from "./block.model";
import { BlockDto } from "./dto/block.dto";
import { RequestStatus } from 'common/enum';
import { UserService } from 'modules/users/user.service';
import { FriendRequest } from 'modules/friend-request/friend-request.model';
@Injectable()
export class BlockService {
    constructor(
        @Inject(PROVIDERS.BLOCK_PROVIDER)
        private readonly blockRepository: typeof Block,
        private readonly userService: UserService,
        @Inject(PROVIDERS.FRIEND_REQUEST_PROVIDER)
        private readonly friendRepository: typeof FriendRequest,

    ) { }

    async block(blockDto: BlockDto, userId: number): Promise<Block> {
        const { blockerId, blockedId } = blockDto;
        // Check if the users exist in the database
        const [blocker, blockedUser] = await Promise.all([
            this.userService.checkUserById(blockerId),
            this.userService.checkUserById(blockedId),
        ]);
        if (!blocker) {
            throw new Error(`Blocker with id ${blockerId} does not exist.`);
        }
        // check if the user authorized
        if (blockerId !== userId) {
            throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);

        }
        // check if the user is blocked
        const blocked = await this.blockRepository.findOne({ where: { blockerId, blockedId } });
        if (blocked) {
            throw new HttpException(ERRORS.BLOCK.BLOCKED, 404);

        }
        // check if the user is trying to block himself
        if (blockerId === blockedId) {
            throw new HttpException(ERRORS.BLOCK.NOT_ALLOWED, 404);
        }

        if (!blockedUser) {
            throw new HttpException(ERRORS.USER.NOT_FOUND, 404);

        }
        const transaction = await this.blockRepository.sequelize.transaction();
        try {
            // Create the block record
            const block = await this.blockRepository.create<Block>(blockDto, { transaction });
            // Update the status
            block.status = RequestStatus.BLOCKED;


            // // check if there is a friend request
            const friendRequest = await this.friendRepository.findOne
                ({ where: { senderId: blockerId, recipientId: blockedId } });


            if (friendRequest) {
                // delete the friend request             
                await this.friendRepository.destroy(
                    { where: { senderId: blockerId, recipientId: blockedId, status: 'blocked' } }
                );
            }

            // Save the block record
            await block.save({ transaction });

            // Commit the transaction
            await transaction.commit();

            return block;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`${ERRORS.BLOCK.FAILED}: ${error.message}`);
        }
    }

    async deleteBlock(blockerId: number, blockedId: number): Promise<any> {
        // check if the users exist in the database
        const [blocker, blockedUser] = await Promise.all([
            this.userService.checkUserById(blockerId),
            this.userService.checkUserById(blockedId),
        ]);
        if (!blocker) {
            throw new HttpException(ERRORS.USER.NOT_FOUND, 404);

        }
        if (!blockedUser) {
            throw new HttpException(ERRORS.USER.NOT_FOUND, 404);

        }
        const transaction = await this.blockRepository.sequelize.transaction();
        try {
            // check if the block exists
            const Ifblock = await this.blockRepository.findOne({ where: { blockerId, blockedId } });
            if (!Ifblock) {
                throw new HttpException(ERRORS.USER.NOT_FOUND, 404);

            }
            // update the status
            Ifblock.status = RequestStatus.UNBLOCKED;


            await this.blockRepository.destroy<Block>({ where: { blockerId, blockedId }, transaction });
            await transaction.commit()
        }
        catch (error) {
            await transaction.rollback();
            throw new Error(`${ERRORS.BLOCK.FAILED}: ${error.message}`);

        }
    }

}