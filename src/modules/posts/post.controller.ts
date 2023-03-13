/* eslint-disable prettier/prettier */
import {
    Get,
    Put,
    Body,
    Post,
    Param,
    Query,
    Controller,
    ParseIntPipe,
    // UseGuards,
} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { CommentDto } from './dto/comment.dto';
import { Posts } from './post.model';
import { Roles, User } from 'src/common/decorators';
import { ROLES } from 'src/common/enum';
// import { AuthGuard, RolesGuard } from 'src/common/guards';
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    // @UseGuards(AuthGuard, RolesGuard)
    //create a new post
    @Roles(ROLES.USER)
    @Post()
    createPost(
        @Body() post: PostDto,

    ): Promise<Posts> {
        return this.postService.createPost(post);
    }


    @Roles(ROLES.USER)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ): Promise<Posts[]> {
        return this.postService.getAllPosts(limit, offset);
    }

    @Roles(ROLES.USER)
    @Get(':postId')
    findOne(
        @Param('postId', ParseIntPipe) postid: number,
        @User() user: { id: number },
    ): Promise<Posts> {
        return this.postService.getPostById(postid, user.id);
    }

    @Roles(ROLES.ADMIN)
    @Put(':postId/comments')
    createOrUpdateComment(
        @Param('postId', ParseIntPipe) postId: number,
        @User() user: { id: number },
        @Body() comment: CommentDto,
    ): Promise<CommentDto> {
        return this.postService.createOrUpdateComment(postId, user.id, comment);
    }

    @Roles(ROLES.USER)
    @Post(':postId/comments')
    createComment(
        @Param('postId', ParseIntPipe) postId: number,
        @User() user: { id: number },
        @Body() comment: CommentDto,
    ): Promise<CommentDto> {
        return this.postService.createOrUpdateComment(postId, user.id, comment);
    }
}