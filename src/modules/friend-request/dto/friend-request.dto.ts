/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class FriendRequestDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  recipientId: number;


}
