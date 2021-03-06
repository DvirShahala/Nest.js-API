import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { JwtStrategy } from '../auth/jwt.strategy';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) { }

    @Get()
    async findAll() {
        // Get all posts in the db - 10 times per get
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') userId: number): Promise<PostEntity> {
        // Find the post with this userId
        const post = await this.postService.findOneByUserId(userId);

        // If the userId doesn't exit in the db, throw a 404 error
        if (!post) {
            throw new NotFoundException('This userId doesn\'t exist');
        }

        // If userId exist, return the post
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        console.log("req.user");
        console.log(req.user);
        // Create a new post and return the newly created post
        return await this.postService.create(post, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // Get the number of row affected and the updated post
        const { numberOfAffectedRows, postUpdated } = await this.postService.update(id, post, req.user.id);

        // If the number of row affected is zero, it means the post doesn't exist in our db
        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // Return the updated post
         return postUpdated;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // Delete the post with this id
        const deleted = await this.postService.delete(id, req.user.id);

        // If the number of row affected is zero, 
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        // Return success message
        return 'Successfully deleted';
    }
}
