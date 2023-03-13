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
import { generateToken, comparePassword } from 'src/common/utils';
import * as bcrypt from 'bcrypt';


import { Users } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @Inject(PROVIDERS.USERS_PROVIDER)
        private readonly usersRepository: typeof Users,
    ) { }

    async getAllUsers(): Promise<Users[]> {
        return this.usersRepository.findAll();
    }
    //function to check if user already exists
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
    //function to create new user
    async signup(user: SignupDto): Promise<User | null> {
        try {
            // check if user already exists
            const existUser = await this.usersRepository.findOne({
                where: {
                    email: user.email,
                    username: user.username,
                },
            });
            if (existUser) {
                throw new HttpException(ERRORS.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST, { cause: new Error('Some error') });
            }
            // hash password
            const hashedPassword = await bcrypt.hash(user.password, 10);
            // create user
            const newUser = await this.usersRepository.create({
                email: user.email,
                username: user.username,
                password: hashedPassword,
                role: user.role,
            });
            return {
                user: {
                    id: newUser.id,
                    role: newUser.role,
                    email: newUser.email,
                    username: newUser.username,
                },
                token: generateToken(newUser.username),
            };

        } catch (error) {
            throw new InternalServerErrorException(error)

        }
    }
    //function to login user
    async login(loginDetails: LoginDto): Promise<User> {
        try {
            // check if user exists
            const user = await this.usersRepository.findOne({
                where:
                {
                    username: loginDetails.username,
                    email: loginDetails.email,
                },
            });
            if (!user) {
                throw new HttpException(ERRORS.User_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            // check if password is correct
            const isPasswordCorrect = await comparePassword(
                loginDetails.password,
                user.password,
            );
            if (!isPasswordCorrect) {
                throw new HttpException(ERRORS.INCORRECT_DATA, HttpStatus.BAD_REQUEST);
            }
            return {
                user: {
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    username: user.username,
                },
                token: generateToken(user.username),
            };
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }




}
