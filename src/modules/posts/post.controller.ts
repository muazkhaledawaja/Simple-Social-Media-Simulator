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
    UnauthorizedException,

} from '@nestjs/common';

import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { CommentDto } from './dto/comment.dto';
import { Posts } from './post.model';
import { Roles, User } from 'src/common/decorators';
import { ROLES } from 'src/common/enum';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }


    //create a new post
    @Roles(ROLES.USER)
    @Post()
    createPost(
        @Body() post: PostDto,

    ): Promise<Posts> {
        return this.postService.createPost(post);
    }

    //get all posts
    @Roles(ROLES.USER)
    @Get()
    findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
    ): Promise<Posts[]> {
        return this.postService.getAllPosts(limit, offset);
    }

    //get a post by id
    @Roles(ROLES.USER)
    @Get(':postId')
    async findOne(
      @Param('postId', ParseIntPipe) postId: number,
      @User() user: { id: number },
    ): Promise<Posts> {
        console.log(user);
        
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return this.postService.getPostById(postId, user.id);
    }
    //update a post
    @Roles(ROLES.ADMIN)
    @Put(':postId/comments')
    createOrUpdateComment(
        @Param('postId', ParseIntPipe) postId: number,
        @User() user: { id: number },
        @Body() comment: CommentDto,
    ): Promise<CommentDto> {
        return this.postService.createOrUpdateComment(postId, user.id, comment);
    }
// create a comment
    @Roles(ROLES.USER)
    @Post(':postId/comments')
    createComment(
        @Param('postId', ParseIntPipe) postId: number,
        @User() user: { id: number },
        @Body() comment: CommentDto,
    ): Promise<CommentDto> {
        return this.postService.updataComment(postId, user.id, comment);
    }
}