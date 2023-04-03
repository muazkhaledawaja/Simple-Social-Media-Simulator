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
import { Block } from './block.model';
import { BlockDto } from './dto/block.dto';
import { BlockService } from './block.service';


@Controller('user')
export class BlockController {
    constructor(
        private blockService: BlockService
    ) { }

    @Post('/block')
    async block(@Body() blockDto: BlockDto): Promise<Block> {
        try {
            return await this.blockService.block(blockDto);
        } catch (error) {
            throw new HttpException(`Failed to block user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/unblock/:blockId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async unblock(
        @Param('blockId') blockId: number
    ): Promise<any> {
        try {
            return await this.blockService.unblock(blockId);
        } catch (error) {
            throw new HttpException(`Failed to unblock user: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}