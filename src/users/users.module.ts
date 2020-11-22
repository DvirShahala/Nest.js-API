import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
    controllers: [],
    providers: [UsersService, ...usersProviders],
    exports: [UsersService]
})
export class UsersModule { }