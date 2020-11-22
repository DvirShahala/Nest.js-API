import { Injectable, Inject  } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../core/database/constants/index';


@Injectable()
export class UsersService {

    constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) { }

    private users: User[] = [];

    // Create user
    async createUser(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    // Find user by username
    async findOneByUserName(userName: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { userName } });
    }

    // Find user by email
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }
}
