import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService,
                private PostService: PostsService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(userDeatails: any) {
        // check if user in the token actually exist
        const user = await this.userService.createUser(userDeatails);
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return userDeatails;
    }
}