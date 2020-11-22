import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        // Find if user exist with this username
        const user = await this.userService.findOneByUserName(username);
        if (!user) {
            return null;
        }

        // Find if user password match
        const match = await this.comparePassword(pass, user.password);

        if (!match) {
            return null;
        }

        const { password, ...result } = user['dataValues'];
        return result;
    }

    // Login user
    public async login(userDetails) {
        const userN = await this.validateUser(userDetails.userName, userDetails.password);
        if (!userN) {
            throw new UnauthorizedException('Invalid user credentials');
        }
        const token = await this.generateToken(userN);
        return { userN, token };
    }

    public async create(user) {
        // Hash the password
        const pass = await this.hashPassword(user.password);

        // Create the user
        const newUser = await this.userService.createUser({ ...user, password: pass });

        const { password, ...result } = newUser['dataValues'];

        // Generate token
        const token = await this.generateToken(result);

        // Return the user and the token
        return { user: result, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}