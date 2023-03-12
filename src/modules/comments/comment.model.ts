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
import moment from 'moment';

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
export class Comments extends Model<Comments> {
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

  @Column({ field: 'createdBy', type: DataType.STRING })
  commentTime: Date;
  
  @Column({ field: 'createdBy', type: DataType.STRING })
  createdBy: number;

  @Column({ field: 'updatedBy', type: DataType.STRING })
  updatedBy: number;

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
  // i want to put default value as new Date()  

  @Column({
    field: 'deletedBy',
    type: DataType.STRING,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  })
  deletedBy: string;

}
