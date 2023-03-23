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
import * as moment from 'moment';



@Table({
  tableName: 'comments',
  timestamps: true,
  paranoid: true,
  underscored: true,

})

@Scopes(() => {
  return {
    no_password: {
      attributes: {
        exclude: ['password'],
      },
    },
    basic: {
      attributes: {
        exclude: [
          'updated_at',
          'updated_at',
          'updated_by',
          'created_by',
          'deleted_at',
          "deleted_by"
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
    field: 'created_by',
    type: DataType.INTEGER
  })
  created_by: number;

  @Column({
    field: 'updated_by',
    type: DataType.INTEGER
  })
  updated_by: number;

  @Column({
    field: 'created_at',
    type: DataType.STRING,
  })
  created_at: Date;

  @Column({
    field: 'updated_at',
    type: DataType.STRING,
  })
  updated_at: Date;

  @Column({
    field: 'deleted_at',
    type: DataType.STRING,
  })
  deleted_at: Date;


  @Column({
    field: 'deleted_by',
    type: DataType.STRING,
  })
  deleted_by: string;

  @BelongsTo(() => Posts)
  post: Posts;

  @BelongsTo(() => Users)
  user: Users;


}


