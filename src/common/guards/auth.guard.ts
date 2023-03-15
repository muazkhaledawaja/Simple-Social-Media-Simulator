/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/modules/users/user.service';
import { verifyToken } from 'src/common/utils';
import { SYSTEM } from '../constants/general';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<string[]>(
            'public',
            context.getHandler(),
        );
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization || request.headers['x-access-token'] || request.headers.token;
        if (!token) return false;


        const decoded = verifyToken(token, SYSTEM.SECRET);
        if (!decoded) return false;


        const userCheck = await this.userService.getUser({
            username: decoded.username,
            email: decoded.email
        })

        if (!userCheck) return false;

        request.user = userCheck;

        return true;

    }
}