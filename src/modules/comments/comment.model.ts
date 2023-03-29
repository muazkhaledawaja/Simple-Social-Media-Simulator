/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  Scopes,
  BelongsTo
} from 'sequelize-typescript'

import { Posts } from '../posts/post.model'
import { Users } from '../users/user.model'



@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
  underscored: true,

})
@Scopes(() => {
  return {
    basic: {
      attributes: {
        exclude: [
          'updated_at',
          'updated_by',
          'created_by',
          'deleted_at',
          "deleted_by",
          "created_at",
        ],
      },
    },
  };
})
export class Comments extends Model<Comments> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column({ field: 'userId', type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Posts)
  @Column({ field: 'postId', type: DataType.INTEGER })
  postId: number;

  @Column({ field: 'content', type: DataType.STRING })
  content: string;


  @Column({
    type: DataType.INTEGER
  })
  createdBy: number;

  @Column({
    type: DataType.INTEGER
  })
  updatedBy: number;

  @Column({
    type: DataType.DATE
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
  })
  deletedAt: Date;

  @Column({
    field: 'deleted_by',
    type: DataType.STRING,
  })
  deletedBy: string;

  @BelongsTo(() => Posts)
  post: Posts;

  @BelongsTo(() => Users)
  user: Users;


}


