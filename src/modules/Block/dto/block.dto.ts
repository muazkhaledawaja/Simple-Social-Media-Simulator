/* eslint-disable prettier/prettier */
import { IsNumber } from 'class-validator';

export class BlockDto {
  @IsNumber()
  blockerId: number;

  @IsNumber()
  blockedId: number;


}
