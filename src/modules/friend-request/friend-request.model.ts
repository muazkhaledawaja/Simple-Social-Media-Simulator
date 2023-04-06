/* eslint-disable prettier/prettier */
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Scopes,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { RequestStatus } from '../../common/enum';
import { Users } from 'modules/users/user.model';



@Table({
  tableName: 'FriendRequest',
  timestamps: true,
  paranoid: true,
  underscored: true,

})

@Scopes(() => {
  return {

    basic: {
      attributes: {
        exclude: [
          "created_at",
          "updated_at"
        ],
      },
    },
  };
})
export class FriendRequest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;


  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  senderId: number;

  @BelongsTo(() => Users)
  sender: Users;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recipientId: number;

  @BelongsTo(() => Users)
  recipient: Users;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,

  })
  isAccepted: boolean;

  @Column({
    type: DataType.ENUM(
      RequestStatus.ACCEPTED,
      RequestStatus.DECLINED,
      RequestStatus.PENDING,
      RequestStatus.UNFRIEND,
      RequestStatus.BLOCKED,
      RequestStatus.UNBLOCKED
    ),
    defaultValue: RequestStatus.PENDING,
  })
  status: RequestStatus;
}

