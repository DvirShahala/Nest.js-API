import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    fullName: string;
    
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}