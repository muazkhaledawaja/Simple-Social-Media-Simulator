/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    userNameOrEmail: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

