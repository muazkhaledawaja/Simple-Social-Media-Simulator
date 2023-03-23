/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

}