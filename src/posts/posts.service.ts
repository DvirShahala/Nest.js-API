import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../core/database/constants/index';

@Injectable()
export class PostsService {
  constructor(@Inject(POST_REPOSITORY) private postRepository: typeof Post) { }

  // Create post
  async create(post: PostDto, userId): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }

  // Find posts - limit to 10
  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      limit: 10,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  // Find post by user id
  async findOneByUserId(userId): Promise<Post> {
    return await this.postRepository.findOne({
      where: { userId },
      limit: 10,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  // Delete post
  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  // Update post
  async update(id, data, userId) {
    const [numberOfAffectedRows] = await this.postRepository.update({ ...data }, { where: { id, userId }});
    const postUpdated = await this.postRepository.findOne({
      where: { id, userId },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    return { numberOfAffectedRows, postUpdated };
  }
}