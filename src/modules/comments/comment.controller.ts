/* eslint-disable prettier/prettier */
import {
    Get,
    Put,
    Body,
    Post,
    Controller,
    ParseIntPipe,
    Delete,
    Param,
    UseInterceptors,
 
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ROLES } from '../../common/enum';
import { CheckBlocked, Roles, User } from '../../common/decorators';
import { BlockInterceptor } from 'common/interceptor/block.interceptor';
 


@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
    ) { }


    // create a comment for a post
    @Post('/:postId')
    @Roles(ROLES.USER)
    @UseInterceptors(BlockInterceptor)
    createComment(
        @User() user: { id: number },
        @Param('postId', ParseIntPipe) postId: number,
        @Body() commentDto: CommentDto,
        // @CheckBlocked() any,

    ) {
        return this.commentService.createComment(postId, user.id, commentDto);
    }


    // get all comments for a post
    @Get(':postId/all')
    // @UseGuards(BlockGuard)
    findAllComments(
        @Param('postId', ParseIntPipe) postId: number,
        @CheckBlocked() any,
    ) {
        return this.commentService.findAllComments(postId);
    }


    // get all comments for a post by user
    @Get('/user')
    @Roles(ROLES.USER)
    findCommentsByUser(
        @User() user: { id: number },
        @CheckBlocked() any,
    ) {
        return this.commentService.findCommentsByUser(user.id);
    }


    // update a comment for a post
    @Put('/:postId/:commentId')
    @Roles(ROLES.USER)
    updateComment(
        @User() user: { id: number },
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) id: number,
        @Body() comment: CommentDto,

    ) {
        return this.commentService.updateComment(postId, user.id, comment, id);
    }

    // delete a comment for a post
    @Delete('/:postId/:commentId')
    @Roles(ROLES.USER)
    deleteComment(
        @User() user: { id: number },
        @Param('postId', ParseIntPipe) postId: number,
        @Param('commentId', ParseIntPipe) id: number,
    ) {
        return this.commentService.deleteComment(postId, user.id, id);
    }

}
