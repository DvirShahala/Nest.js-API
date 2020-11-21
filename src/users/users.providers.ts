import { User } from './user.entity';
import { USER_REPOSITORY } from '../core/database/constants/index';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}];