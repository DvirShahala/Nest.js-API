import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { iUser } from './inerfaces/user.interface';


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    // @Post('register')
    // async createUser(@Body() UserDto: UserDto) {
    //     this.userService.createUser(UserDto);
    // }
    // @Post('login')
    // async loginUser() {
    //     //return this.userService.loginUser();
    // }
}
