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

  @Column({ field: 'createdBy', type: DataType.STRING })
  createdBy: string;

  @Column({ field: 'updatedBy', type: DataType.STRING })
  updatedBy: string;

  @Column({
    field: 'createdAt',
    type: DataType.STRING,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  createdAt: Date;

  @Column({
    field: 'updatedAt',
    type: DataType.STRING,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  updatedAt: Date;

  @Column({
    field: 'deletedAt',
    type: DataType.STRING,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss')
  })
  deletedAt: Date;

  @Column({
    field: 'deletedBy',
    type: DataType.STRING,
  })
  deletedBy: string;

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Comments)
  comments: Comments[];

}
