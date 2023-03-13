/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Posts } from './post.model';
import { POST } from 'src/common/types';

import { CommentService } from '../comments/comment.service';
import { CommentDto } from './dto/comment.dto';
import { PostDto } from './dto/post.dto';

import { ERRORS, PROVIDERS } from 'src/common/constants';

@Injectable()
export class PostService {
  constructor(
    @Inject(PROVIDERS.POSTS_PROVIDER)
    private postRepository: typeof Posts,
    private readonly commentService: CommentService,
  ) { }
 
  // Create a post
  async createPost(  post: PostDto): Promise<Posts> {
    try {
      const newPost = await this.postRepository.create<Posts>({
        ...post,
    
      });
      return newPost;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // Get all posts
  async getAllPosts(limit: number, offset: number): Promise<Posts[]> {
    try {
      const posts = await this.postRepository.findAll({
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
          ['isCommentedAt', 'ASC'],
        ],
      })
      return posts;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // Get post by id
  async getPostById(postId: number,userId:number): Promise<Posts> {
    return await this.postRepository.findOne({
      where: { id: postId,
        userId:userId },
    })
  }

  // Find one post by with comments

  async findPostWithComments(postId: number): Promise<POST> {
    try {

      const post = await this.postRepository.findOne({
        where: { id: postId },
      })
      // check if post exists
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      // get comments
      const comments = await this.commentService.findAllComments(postId);
      return { post, comments };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // create or update comment on post
  async createOrUpdateComment(postId:number,userId:number,comment:CommentDto):Promise<CommentDto>{
    // check if post exists
    const post = await this.getPostById(postId,userId)
    if(!post){
      throw new HttpException(ERRORS.POST_NOT_FOUND,404)
    }
    await this.updataComment(postId,userId,comment)
    return comment
  }

    // update a comment if found or create it for a post
    async updataComment(
      postId: number,
      userId: number,
      comment: CommentDto,
    ): Promise<CommentDto> {
      try {
        const foundComment = await this.commentService.findOne(postId, userId);
        if (foundComment) {
          await this.commentService.updateComment(
            postId,
            userId,
            comment,
        
          );
        } else {
          await this.commentService.createComment(postId, userId, comment);
        }
        return comment;
      } catch (err) {
        throw new InternalServerErrorException(err);
      }
    }

  
  

}