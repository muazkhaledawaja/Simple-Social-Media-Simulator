/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  HttpException,
  InternalServerErrorException,

} from '@nestjs/common';

import { Posts } from './post.model';
import { Comments } from '../comments/comment.model';
import { CommentService } from '../comments/comment.service';
import { CommentDto } from '../comments/dto/comment.dto';
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
  async createPost(post: PostDto, userId: number): Promise<Posts> {
    try {
      const newPost = await this.postRepository.create<Posts>({
        ...post,
        userId,
      });
      return newPost;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  //edit post
  async updatePost(postId: number, post: PostDto): Promise<Posts> {
    try {
      const foundPost = await this.getPostById(postId);
      if (!foundPost) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      await this.postRepository.update(post, { where: { id: postId } });
      return foundPost;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // delete a post
  async deletePost(postId: number): Promise<Posts> {
    try {
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      await this.postRepository.destroy({ where: { id: postId } });
      return post;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // delete all posts
  async deleteAllPosts(): Promise<void> {
    try {
      await this.postRepository.destroy({ where: {} });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  //  find all comments for a post
  async findAllComments(postId: number): Promise<any> {
    try {
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      const comments = await this.commentService.findAllComments(postId);
      return comments;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // get a post by post id
  async getPostById(postId: number): Promise<Posts> {
    try {
      const post = this.postRepository.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }

      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);

    }

  }

  // Get all posts
  async getAllPosts(limit: number, offset: number): Promise<Posts[]> {
    try {
      const posts = await this.postRepository.findAll({
        limit: limit || 10,
        offset: offset || 0,
        order: [
          ['createdAt', 'DESC'],

        ],

      })
      return posts;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // get all posts from database
  async getAllPostsFromDb(): Promise<Posts[]> {
    try {
      const posts = await this.postRepository.findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      return posts;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  //get all timeline posts
  async getAllTimeLinePosts(): Promise<any> {
    const posts = await this.postRepository.findAll()
    return posts;

  }

  // get all posts by user id
  async getAllPostsByUserId(userId: number): Promise<Posts[]> {
    try {
      const posts = await this.postRepository.findAll({
        where: { userId },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      return posts;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }


  // Find one post by with comments
  async findPostWithComments(postId: number): Promise<any> {

    try {
      // find post
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      // find comments
      const comments = await this.commentService.findAllComments(postId);
      return { post, comments };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // update a comment if found or create it for a post useing upsert
  async updataComment(
    postId: number,
    userId: number,
    comment: CommentDto,
  ): Promise<any> {
    const foundComment = await this.commentService.findCommentsByUser(postId, userId)
    if (foundComment) {
      await this.commentService.updateComment(postId, userId, comment)
    }else{
      return "comment not found"
    }
    
   
  }

  // create or update comment on post
  async createOrUpdateComment(postId: number, userId: number, comment: CommentDto): Promise<CommentDto> {
    // check if post exists
    const post = await this.getPostById(postId)
    if (!post) {
      throw new HttpException(ERRORS.POST_NOT_FOUND, 404)
    }
    await this.updataComment(postId, userId, comment)
    return comment
  }


}