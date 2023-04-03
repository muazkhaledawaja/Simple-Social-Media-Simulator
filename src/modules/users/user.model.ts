/* eslint-disable prettier/prettier */

import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
  Scopes,
} from 'sequelize-typescript';
import { ROLES } from '../../common/enum/index';
import { Posts } from '../posts/post.model';
import { Comments } from '../comments/comment.model';


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
          'updated_by',
          'created_by',
          'deleted_at',
          "deleted_by",
          "created_at",
          "updated_at"
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

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Comments)
  comments: Comments[];

 
}
