/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentDto } from '../../modules/comments/dto/comment.dto';
import { Inject, Injectable, HttpException } from '@nestjs/common';
import { PROVIDERS, ERRORS } from '../../common/constants';
import { Comments } from './comment.model';

@Injectable()
export class CommentService {
    constructor(
        @Inject(PROVIDERS.COMMENTS_PROVIDER)
        private readonly commentRepository: typeof Comments,
    ) { }

    // create a comment for a post
    async createComment(
        postId: number,
        userId: number,
        commentDto: CommentDto
    ): Promise<any> {

        const comment = await this.commentRepository.create<Comments>({
            ...commentDto,
            postId,
            userId,
            createdBy: userId,
            updatedBy: userId,
        })
        return comment && 'Comment created successfully'
    }



    // find all comments for a post
    async findAllComments(postId: number): Promise<Comments[]> {
        const comments = await this.commentRepository.findAll({
            where: { postId },

            order: [['createdAt', 'DESC']],
        })
        return comments;
    }



    // find a comment by user id 
    async findCommentsByUser(userId: number): Promise<Comments[]> {
        const comment = await this.commentRepository.findAll({
            where: { userId },

        })
        return comment;
    }



    // update a comment for a post
    async updateComment(
        postId: number,
        userId: number,
        comment: CommentDto,
        id: number

    ): Promise<any> {
        const Ifcomment = await this.commentRepository.findOne({
            where: { postId, userId, id }
        })
        if (!Ifcomment) {
            throw new HttpException(ERRORS.COMMENT.NOT_FOUND, 404)
        }
        return await this.commentRepository.update(comment, { where: { postId, userId, updatedBy: userId, id } }
        )
    }

    // delete a comment for a post
    async deleteComment(
        postId: number,
        userId: number,
        id: number

    ): Promise<any> {
        const Ifcomment = await this.commentRepository.findOne({
            where: { postId, userId, id }
        })
        if (!Ifcomment) {
            throw new HttpException(ERRORS.COMMENT.NOT_FOUND, 404)

        }

        return await this.commentRepository.destroy({
            where: { postId, userId, id }
        })
    }

}