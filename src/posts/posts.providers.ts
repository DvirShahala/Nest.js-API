import { Post } from './post.entity';
import { POST_REPOSITORY } from '../core/database/constants/index';

export const postsProviders = [{
    provide: POST_REPOSITORY,
    useValue: Post,
}];