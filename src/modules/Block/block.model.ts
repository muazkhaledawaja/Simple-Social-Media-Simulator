/* eslint-disable prettier/prettier */
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  Scopes,
  AutoIncrement,
  DataType,
  BelongsTo
} from 'sequelize-typescript';
import { Users } from '../users/user.model';
import { RequestStatus } from '../../common/enum';

@Table({
  tableName: 'Block',
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
export class Block extends Model<Block> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blockerId: number;

  @BelongsTo(() => Users)
  blocker: Users;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  blockedId: number;

  @BelongsTo(() => Users)
  blocked: Users;


  @Column({
    type: DataType.ENUM(
      RequestStatus.UNBLOCKED,
      RequestStatus.BLOCKED
    ),
    defaultValue: RequestStatus.BLOCKED,
  })
  status: RequestStatus;





}
