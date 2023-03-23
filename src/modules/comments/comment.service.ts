/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentDto } from 'src/modules/comments/dto/comment.dto';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PROVIDERS, ERRORS } from 'src/common/constants';
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
    async findCommentsByUser(postId: number, userId: number): Promise<Comments[]> {
        const comment = await this.commentRepository.findAll({
            where: { postId, userId },

        })
        return comment;
    }


    // create a comment for a post
    async createComment(
        postId: number,
        userId: number,
        commentDto: CommentDto
    ): Promise<Comments> {

        const comment = await this.commentRepository.create<Comments>({
            ...commentDto,
            postId,
            userId,
            created_by: userId,
            updated_by: userId,
        })
        return comment;
    }

    // update a comment for a post
    async updateComment(
        postId: number,
        userId: number,
        commentDto: CommentDto
    ): Promise<void> {

        await this, this.commentRepository.upsert({
            ...commentDto,
            postId,
            userId,
            updated_by: userId

        }
        )
    }

    // delete a comment for a post
    async deleteComment(postId: number, userId: number): Promise<string> {

        const comment = await this.commentRepository.destroy({
            where: { postId, userId, }
        })
        return 'Comment deleted successfully'

    }

}