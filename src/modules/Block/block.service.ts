/* eslint-disable prettier/prettier */
import { PROVIDERS } from 'common/constants';
import { Injectable, Inject } from "@nestjs/common";
import { Block } from "./block.model";
import { BlockDto } from "./dto/block.dto";
import { RequestStatus } from 'common/enum';
import { UserService } from 'modules/users/user.service';
@Injectable()
export class BlockService {
    constructor(
        @Inject(PROVIDERS.BLOCK_PROVIDER)
        private readonly blockRepository: typeof Block,
        private readonly userService: UserService,
    ) { }

    async block(blockDto: BlockDto): Promise<Block> {
        const { blockerId, blockedId } = blockDto;
        // Check if the users exist in the database
        const [blocker, blockedUser] = await Promise.all([
            this.userService.checkUserById(blockerId),
            this.userService.checkUserById(blockedId),
        ]);
        if (!blocker) {
            throw new Error(`Blocker with id ${blockerId} does not exist.`);
        }
        if (!blockedUser) {
            throw new Error(`User with ID ${blockedId} not found`);
        }
        const transaction = await this.blockRepository.sequelize.transaction();
        try {
            // Create the block record
            const block = await this.blockRepository.create<Block>(blockDto, { transaction });
            // Update the status
            block.status = RequestStatus.BLOCKED;
            // Save the block record
            await block.save({ transaction });
            // Commit the transaction
            await transaction.commit();
            return block;
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Failed to create block: ${error.message}`);
        }
    }

    async deleteBlock(blockerId: number, blockedId: number): Promise<any> {
        // check if the users exist in the database
        const [blocker, blockedUser] = await Promise.all([
            this.userService.checkUserById(blockerId),
            this.userService.checkUserById(blockedId),
        ]);
        if (!blocker) {
            throw new Error(`Blocker with id ${blockerId} does not exist.`);
        }
        if (!blockedUser) {
            throw new Error(`User with ID ${blockedId} not found`);
        }
        const transaction = await this.blockRepository.sequelize.transaction();
        try {
            // check if the block exists
            const Ifblock = await this.blockRepository.findOne({ where: { blockerId, blockedId } });
            if (!Ifblock) {
                throw new Error(`Block not found`);
            }
            await this.blockRepository.destroy<Block>({ where: { blockerId, blockedId }, transaction });
            await transaction.commit()
        }
        catch (e) {
            await transaction.rollback();
            throw new Error(`Failed to create block: ${e.message}`);
        }
    }

}