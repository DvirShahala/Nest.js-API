import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../core/database/constants/index';
import jwt from 'jsonwebtoken'
import { stringify } from 'querystring';
import { json } from 'sequelize';


@Injectable()
export class PostsService {
  constructor(@Inject(POST_REPOSITORY) private postRepository: typeof Post) { }

  async create(post: PostDto, userId): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      limit: 10,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOneByUserId(userId): Promise<Post> {
    return await this.postRepository.findOne({
      where: { userId },
      limit: 10,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    console.log(id, data, userId);
    const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update({ ...data }, { where: { id, userId } });
    return { numberOfAffectedRows, updatedPost };
  }

}