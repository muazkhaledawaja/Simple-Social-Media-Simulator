/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Scopes,
  HasMany,

} from 'sequelize-typescript';
import * as moment from 'moment';



import { Users } from '../users/user.model';
import { Comments } from '../comments/comment.model';


@Table({
  tableName: 'posts',
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
export class Posts extends Model<Posts> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column({
    field: 'userId',
    type: DataType.INTEGER
  })
  userId: number;

  @Column({
    field: 'content',
    type: DataType.STRING
  })
  content: string;


  @Column({
    field: 'created_by',
    type: DataType.INTEGER
  })
  created_by: string;

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


  @HasMany(() => Comments)
  comments: Comments[];



}