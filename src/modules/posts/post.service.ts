/* eslint-disable prettier/prettier */
import {
  Inject,
  Injectable,
  HttpException,
  

} from '@nestjs/common';

import { Posts } from './post.model';
import { CommentService } from '../comments/comment.service';
import { PostDto } from './dto/post.dto';

import { ERRORS, PROVIDERS } from '../../common/constants';
import { Comments } from '../comments/comment.model';

@Injectable()
export class PostService {
  constructor(
    @Inject(PROVIDERS.POSTS_PROVIDER)
    private postRepository: typeof Posts,
    private readonly commentService: CommentService,
  ) { }

  // Create a post
  async createPost(post: PostDto, userId: number): Promise<Posts> {
  
      const newPost = await this.postRepository.create<Posts>({
        ...post,
        userId,
      });
      return newPost;

  }

  //edit post
  async updatePost(postId: number, post: PostDto,userId:number): Promise<Posts> {

      const foundPost = await this.getPostById(postId);
      if (!foundPost) {
        throw new HttpException(ERRORS.POST.NOT_FOUND, 404);
      }
      const user = foundPost.userId;
      if (user !== userId) {
        throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
      }
      await this.postRepository.update(post, { where: { id: postId } });
      return foundPost;
   
  }

  // delete a post
  async deletePost(postId: number,userId:number): Promise<Posts> {
   
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST.NOT_FOUND, 404);
      }
      const user = post.userId;
      if (user !== userId) {
        throw new HttpException(ERRORS.USER.NOT_AUTHORIZED, 404);
      }
      await this.postRepository.destroy({ where: { id: postId } });
      return post;
  
  }

  // delete all posts
  async deleteAllPosts(): Promise<void> {
   
      await this.postRepository.destroy({ where: {} });
  
  }

  //  find all comments for a post
  async findAllComments(postId: number): Promise<any> {
    
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST.NOT_FOUND, 404);
      }
      const comments = await this.commentService.findAllComments(postId);
      return {
      post:  {
        comments
      }
      };
 
  }

  // get a post by post id
  async getPostById(postId: number): Promise<Posts> {
    
      const post = this.postRepository.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw new HttpException(ERRORS.POST.NOT_FOUND, 404);
      }

      return post;
  

  }

  // Get all posts
  async getAllPosts(limit: number, offset: number): Promise<Posts[]> {

      const posts = await this.postRepository.findAll({
        limit: limit || 10,
        offset: offset || 0,
        order: [
          ['createdAt', 'DESC'],

        ],

      })
      return posts;
   
  }

 

  //get all timeline posts
  async getAllTimeLinePosts(): Promise<any> {
    const posts = await this.postRepository.findAll()
    return posts;

  }

  // get all posts by user id
  async getAllPostsByUserId(userId: number): Promise<Posts[]> {
    // check if user exists
    const user = await this.postRepository.findOne({
      where: { userId },
    });
    if (!user) {
      throw new HttpException(ERRORS.USER.NOT_FOUND, 404);
    }
 console.log(user);
 
   
      const posts = await this.postRepository.findAll({
        where: { userId },
      
      });
      return posts;
 
  }

  // join post and comments
  async findAllWithComments(): Promise<Posts[]> {
    return await this.postRepository.findAll({
      include: [
        {
          model: Comments,
          as: 'comments',
        },
      ],
    });
  }


  // Find one post by with comments
  async findPostWithComments(postId: number): Promise<any> {

      // find post
      const post = await this.getPostById(postId);
      if (!post) {
        throw new HttpException(ERRORS.POST.NOT_FOUND, 404);
      }
      // find comments
      const comments = await this.commentService.findAllComments(postId);
      return { post, comments };
   
  }

  //fine post 
  async findPost(postId: number): Promise<Posts> {
    return await this.postRepository.findOne({
      where: { id: postId },
    });
  }


 

}