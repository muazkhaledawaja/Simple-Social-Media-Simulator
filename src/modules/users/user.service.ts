/* eslint-disable prettier/prettier */
import {
    Inject,
    Injectable,
    HttpStatus,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';

import { SignupDto, LoginDto } from './dto';
import { User } from 'src/common/types';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { generateToken, hashedPassword, comparePassword } from 'src/common/utils';

import { Users } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @Inject(PROVIDERS.USERS_PROVIDER)
        private readonly usersRepository: typeof Users,
    ) { }

    async getUser(userNameOrEmail: {
        email?: string;
        username?: string;
    }): Promise<Users> {
        const where: any = {};
        if (userNameOrEmail.email) {
            where.email = userNameOrEmail.email;
        } else if (userNameOrEmail.username) {
            where.userName = userNameOrEmail.username;
        }
        return this.usersRepository.findOne({
            where: {
                ...where,
            }
        })
    }

    async signup(user: SignupDto): Promise<User> {
        try {
            // check if user already exists
            const existUser = await this.getUser({
                email: user.email,
                username: user.username,
            })
            if (existUser) {
                throw new HttpException(ERRORS.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            // hash password and create user
            user.password = hashedPassword(user.password);
            const newUser = await this.usersRepository.create({ ...user });
            return {
                user: { id: newUser.id, role: newUser.role, email: newUser.email, username: newUser.username, }
                , token: generateToken(newUser.username),
            }
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async login(loginDetails: LoginDto): Promise<User> {
        try {
            // user can login with right credentials
            const user = await this.getUser({
                email: loginDetails.userNameOrEmail,
                username: loginDetails.userNameOrEmail,
            })
            if (!user) {
                throw new HttpException({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: ERRORS.INCORRECT_DATA,
                },
                    HttpStatus.UNAUTHORIZED);
            }
            // check if password is correct
            const isPassWordCorrect = await comparePassword(
                loginDetails.password,
                user.password,
            )
            // if password is incorrect
            if (!isPassWordCorrect) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.UNAUTHORIZED,
                        message: ERRORS.INCORRECT_DATA,
                    },
                    HttpStatus.UNAUTHORIZED,
                );
            }
            return {
                user: {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    username: user.username,
                },
                token: generateToken(user.username),
            }
        }
        catch (err) {
            throw new InternalServerErrorException(err);
        }

    }




}
