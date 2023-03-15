/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentDto } from 'src/modules/posts/dto/comment.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS, SYSTEM } from 'src/common/constants';
import { Comments } from './comment.model';

@Injectable()
export class CommentService {
    constructor(
        @Inject(PROVIDERS.COMMENTS_PROVIDER)
        private readonly commentRepository: typeof Comments,
    ) { }

    // find all comments for a post
    async findAllComments(postId: number): Promise<Comments[]> {
        const comments = await this.commentRepository.findAll({
            where: { postId },

            order: [['createdAt', 'DESC']],
        })
        return comments;
    }

    // find a comment by user id 
    async findOne(postId: number, userId: number): Promise<Comments> {
        const comment = await this.commentRepository.findOne({
            where: { postId, userId },

        })
        return comment;
    }

    // create a comment for a post
    async createComment(postId: number, userId: number, commentDto: CommentDto): Promise<Comments> {
        const comment = await this.commentRepository.create({
            ...commentDto,
            postId,
            userId,
            createdBy: userId,
            updatedBy: userId,
        })
        return comment;
    }

    // update a comment for a post
    async updateComment(postId: number, userId: number, commentDto: CommentDto): Promise<void> {
        await this, this.commentRepository.update(
            {
                ...commentDto, postId, userId, updatedBy: userId

            },
            {
                where: { postId, userId },

            }
        )
    }

}