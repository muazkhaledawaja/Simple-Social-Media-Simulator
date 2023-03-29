/* eslint-disable prettier/prettier */
import {
    Get,
    Put,
    Body,
    Post,
    Query,
    Controller,
    ParseIntPipe,
    Delete,
    Param,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { ROLES } from '../../common/enum';
import { Roles, User } from '../../common/decorators';


@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    // get all comments for a post
    @Get()
    findAllComments(
        @Param('postId', ParseIntPipe) postId: number
    ) {
        return this.commentService.findAllComments(postId);
    }
    // get all comments for a post by user
    @Get('user')
    @Roles(ROLES.USER)
    findCommentsByUser(
        @User('id') userId: number,
        @Query('postId', ParseIntPipe) postId: number
    ) {
        return this.commentService.findCommentsByUser(postId, userId);
    }

    // create a comment for a post
    @Post()
    @Roles(ROLES.USER)
    createComment(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body() commentDto: CommentDto
    ) {
        return this.commentService.createComment(postId, userId, commentDto);
    }

    // update a comment for a post
    @Put(':commentId')
    @Roles(ROLES.USER)
    updateComment(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body() commentDto: CommentDto
    ) {
        return this.commentService.updateComment(postId, userId, commentDto);
    }

    // delete a comment for a post
    @Delete(':commentId')
    @Roles(ROLES.USER)
    deleteComment(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
     
    ) {
        return this.commentService.deleteComment(postId, userId);
    }
 
    




}