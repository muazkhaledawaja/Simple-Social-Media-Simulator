/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDto, LoginDto } from "./dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async signup(@Body() user: SignupDto) {
        return await this.userService.signup(user);
    }

    @Post('login')
    async login(@Body() user: LoginDto) {
        return await this.userService.login(user);
    }

}