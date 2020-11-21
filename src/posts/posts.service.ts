import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../core/database/constants/index';
import jwt from 'jsonwebtoken'


@Injectable()
export class PostsService {
  constructor(@Inject(POST_REPOSITORY) private postRepository: typeof Post) { }

  async create(post: PostDto, token): Promise<Post> {
    let splitToken = token.split(" ", 2);
    splitToken = splitToken[1];
    console.log(splitToken);
    let decodeToken: any = jwt.decode(splitToken);
    const idOfUser = decodeToken.userId;
    console.log("aaaaaaaaaaaaaaaaaaaa");
    console.log(decodeToken);
    console.log(idOfUser);
    return await this.postRepository.create<Post>({ ...post, idOfUser});
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update({ ...data }, { where: { id, userId }, returning: true });

    return { numberOfAffectedRows, updatedPost };
  }
  
  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOneByUserId(userId): Promise<Post> {
    return await this.postRepository.findOne({
      where: { userId },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  // async findOne(id): Promise<Post> {
  //   return await this.postRepository.findOne({
  //     where: { id },
  //     include: [{ model: User, attributes: { exclude: ['password'] } }],
  //   });
  // }
}