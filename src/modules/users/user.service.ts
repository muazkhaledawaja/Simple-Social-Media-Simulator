/* eslint-disable prettier/prettier */
import {
    Inject,
    Injectable,
    HttpStatus,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';

import * as AWS from 'aws-sdk';

import { SignupDto, LoginDto } from './dto';
import { User } from '../../common/types';
import { ERRORS, PROVIDERS } from '../../common/constants';
import { generateToken, comparePassword, hashPassword } from '../../common/utils';


import { Users } from './user.model';

@Injectable()
export class UserService {
    private readonly cognito: AWS.CognitoIdentityServiceProvider;
    constructor(
        @Inject(PROVIDERS.USERS_PROVIDER)
        private readonly usersRepository: typeof Users,
    ) {

        // initialize AWS Cognito client
        this.cognito = new AWS.CognitoIdentityServiceProvider({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

    }


    //function to check if user already exists
    async checkUser(userNameOrEmail: {
        email: string;
        username: string;
    }): Promise<Users> {
        const where: any = {};
        if (userNameOrEmail.email) {
            where.email = userNameOrEmail.email;
        } if (userNameOrEmail.username) {
            where.userName = userNameOrEmail.username;
        }
        return this.usersRepository.findOne({where})
    }

    // function to check if user exists by id
    async checkUserById(id: number): Promise<Users> {
        return this.usersRepository.findOne({ where: {id}})
    }


    // function to create new user in Cognito
    async signup(user: SignupDto): Promise<User | any> {
        try {
            // check if user already exists
            const checkUserWithEmailOrUsername = await this.checkUser({
                email: user.email,
                username: user.username,
            });
            if (checkUserWithEmailOrUsername) {
                throw new HttpException(ERRORS.USER.ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            // create user in Cognito
            const params = {
                UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
                Username: user.username,
                Password: user.password,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: user.email,
                    },
                ],
            }
            await this.cognito.adminCreateUser(params).promise();

            // hash password
            const hashedPassword = await hashPassword(user.password, 10);
            // create user
            const newUser = await this.usersRepository.create({
                email: user.email,
                username: user.username,
                password: hashedPassword,
                role: user.role
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
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: 'your_app_client_id',
                UserPoolId: 'your_user_pool_id',
                AuthParameters: {
                    USERNAME: loginDetails.username,
                    PASSWORD: loginDetails.password,
                },
            };
            const { AuthenticationResult } = await this.cognito.initiateAuth(params).promise();


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
                throw new HttpException(ERRORS.USER.NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            // check if password is correct
            const isPasswordCorrect = await comparePassword(
                loginDetails.password,
                user.password,
            );
            if (!isPasswordCorrect) {
                throw new HttpException(ERRORS.USER.INCORRECT_DATA, HttpStatus.BAD_REQUEST);
            }
            // delete user password
            delete user.password;
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role

                },
                token: AuthenticationResult.IdToken,
            };
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }




}
