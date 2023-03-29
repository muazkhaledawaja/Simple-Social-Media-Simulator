/* eslint-disable prettier/prettier */
import { ERRORS } from '../../../common/constants';
import { ROLES } from '../../../common/enum';
import {
    IsEnum,
    Matches,
    IsEmail,
    IsNotEmpty,
    IsAlphanumeric,
} from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEnum(ROLES, {
      message: 'The provided type is not valid.',
    })
    role: ROLES;
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: ERRORS.PASSWORD_VALIDATION_ERROR,
    })
    password: string;
  
}