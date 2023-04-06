/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Block } from './block.model';
import { BlockDto } from './dto/block.dto';
import { BlockService } from './block.service';
import { User } from 'common/decorators';


@Controller('user')
export class BlockController {
    constructor(
        private blockService: BlockService
    ) { }

    @Post('/block')
    async block(
        @Body() blockDto: BlockDto,
        @User() user: { id: number },
        ): Promise<Block> {
        try {
            return await this.blockService.block(blockDto, user.id);
        } catch (error) {
            throw new HttpException(`Failed to block user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Put('/unblock/:blockerId/:blockedId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async unblockUser(
        @Param('blockerId') blockerId: number,
        @Param('blockedId') blockedId: number
    ): Promise<any> {
        try {
            return await this.blockService.deleteBlock(blockerId, blockedId);
        } catch (error) {
            throw new HttpException(`Failed to unblock user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}