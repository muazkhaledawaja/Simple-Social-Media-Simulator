/* eslint-disable prettier/prettier */
import { Comments } from 'src/modules/comments/comment.model';
import { ROLES } from '../enum';

export type User = {
  user: {
    id: number;
    email: string;
    username: string;
    role: ROLES;
  };
};

export type POST = {
  post: {
    id: number;
    postContent: string;
    isCommentedAt: boolean;
  };
  comments: Comments[];
 
};
