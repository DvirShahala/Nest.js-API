import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.providers';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [PostsController],
    providers: [PostsService, ...postsProviders],
    exports: [PostsService]
})
export class PostsModule {}
