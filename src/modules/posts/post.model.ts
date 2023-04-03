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
  BelongsTo,

} from 'sequelize-typescript';



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


  @Column({
    field: 'deleted_by',
    type: DataType.STRING,
  })
  deleted_by: string;


  @HasMany(() => Comments)
  comments: Comments[];

  @BelongsTo(() => Users)
  user: Users;


}