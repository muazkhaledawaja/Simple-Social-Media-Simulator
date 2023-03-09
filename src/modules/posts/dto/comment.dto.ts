/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}