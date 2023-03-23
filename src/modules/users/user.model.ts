/* eslint-disable prettier/prettier */
import * as moment from 'moment';

import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
  Scopes
} from 'sequelize-typescript';
import { ROLES } from 'src/common/enum';
import { Posts } from '../posts/post.model';
import { Comments } from 'src/modules/comments/comment.model';


@Table({
  tableName: 'users',
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
          'updatedAt',
          'createdAt',
          'updatedBy',
          'createdBy',
          'deletedAt',
        ],
      },
    },
  };
})

export class Users extends Model<Users> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.ENUM(ROLES.ADMIN, ROLES.USER))
  role: ROLES;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Column({ 
    field: 'created_by', 
    type: DataType.INTEGER })
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

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Comments)
  comments: Comments[];

}
