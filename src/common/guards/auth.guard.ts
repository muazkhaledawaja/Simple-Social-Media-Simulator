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

        const request = context.switchToHttp().getRequest();
        const { token } = request.headers;
        if (!token)  return false;
        
        
        const decoded = verifyToken(token, SYSTEM.SECRET);
        if (!decoded)  return false;
        

        const userCheck = await this.userService.getUser({
            username: decoded.username,
        })
        if (!userCheck) return false;

        request.user = userCheck;
        return true;

    }
}