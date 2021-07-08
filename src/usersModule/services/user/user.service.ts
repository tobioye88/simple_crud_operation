import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/usersModule/entities/user.entity';
import { User } from 'src/usersModule/interfaces/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    public userRepository: Repository<UserEntity>,
  ) {}

  async getUser(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  async getAllUsers() {
    return this.userRepository.find();
  }

  async createUser(user: User) {
    return this.userRepository.save(user);
  }

  async git(id: number, user: User) {
    return await this.userRepository.update(id, user);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
