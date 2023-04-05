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
    Delete,
   

} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { CommentDto } from '../comments/dto/comment.dto';
import { Posts } from './post.model';
import {  Roles, User } from '../../common/decorators';
import { ROLES } from '../../common/enum';



@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }


    //create a new post
    @Roles(ROLES.USER)
    @Post()
    createPost(
        @Body() post: PostDto,
        @User() user: { id: number },

    ): Promise<Posts> {
        return this.postService.createPost(post, user.id);
    }

    //get all posts
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ): Promise<Posts[]> {
        return this.postService.getAllPosts(limit, offset);
    }

    // get all posts from different users
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Get('all')
    findAllPosts(
    ): Promise<Posts[]> {
        return this.postService.getAllTimeLinePosts();
    }

    //get a post by id
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Get(':postId')
    async findOne(
        @Param('postId', ParseIntPipe) postId: number,
    ): Promise<Posts> {
        return await this.postService.getPostById(postId);
    }


    //get all posts by user
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Get('users/:userId')
    findAllByUser(
        @Param('userId', ParseIntPipe) userId: number,
    ): Promise<Posts[]> {
       
        return this.postService.getAllPostsByUserId(userId);
    }

    // update a post
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Put(':postId')
    updateOnePost(
        @Param('postId', ParseIntPipe) postId: number,
        @Body() post: PostDto,
    ): Promise<Posts> {
        return this.postService.updatePost(postId, post);
    }

    // delete a post
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Delete(':postId')
    deleteOnePost(
        @Param('postId', ParseIntPipe) postId: number,
    ): Promise<Posts> {
        return this.postService.deletePost(postId);
    }

    // get all comments of a post
    @Roles(ROLES.USER, ROLES.ADMIN)
    @Get(':postId/comments')
    findAllComments(
        @Param('postId', ParseIntPipe) postId: number,
    ): Promise<CommentDto[]> {
        return this.postService.findPostWithComments(postId);
    }


}