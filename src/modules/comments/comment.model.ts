/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  DefaultScope,
} from 'sequelize-typescript'

import { Posts } from '../posts/post.model'
import { Users } from '../users/user.model'

@DefaultScope({
  attributes: {
    exclude: ['deletedAt', 'deletedBy'],
  }
})
@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
  underscored: true,
})
export class Comments extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Posts)
  @Column(DataType.INTEGER)
  postId: number;

  @Column(DataType.STRING)
  commentContent: string;

  @Column(DataType.DATE)
  commentTime: Date;
  @Column(DataType.STRING)
  createdBy: number;

  @Column(DataType.STRING)
  updatedBy: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.STRING)
  deletedBy: string;

}