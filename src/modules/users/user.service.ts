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

  
    //function to check if user already exists
    async getUser(userNameOrEmail: {
        email: string;
        username: string;
    }): Promise<Users> {
        const where: any = {};
        if (userNameOrEmail.email) {
            where.email = userNameOrEmail.email;
        } if (userNameOrEmail.username) {
            where.userName = userNameOrEmail.username;
        }
        return this.usersRepository.findOne({
            where: {
                ...where,

            }
        })
    }
    //function to create new user
    async signup(user: SignupDto): Promise<User | any> {
        try {
            // check if user already exists
            const checkUserWithEmailOrUsername = await this.getUser({
                email: user.email,
                username: user.username,
            });
            if (checkUserWithEmailOrUsername) {
                throw new HttpException(ERRORS.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }

            // hash password
            const hashedPassword = await bcrypt.hashSync(user.password, 10);
            // create user
            const newUser = await this.usersRepository.create({
                email: user.email,
                username: user.username,
                password: hashedPassword,
                role: user.role,
            });
            delete newUser.password;
            return newUser 

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)

        }
    }
    //function to login user
    async login(loginDetails: LoginDto): Promise<any> {
        try {
            // check if user exists
            const user = await this.usersRepository.findOne({
                where:
                {
                    username: loginDetails.username,
                    email: loginDetails.email,
                },
            }
            );
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
                    email: user.email,
                    username: user.username,
                    role: user.role,

                },
                token: generateToken(user.username, user.id),
            };
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }




}
