import { Module } from '@nestjs/common';
import { UsersController } from './usersController/users.controller';
import { UserService } from './services/user/user.service';
import { userProviders } from './providers/user.providers';
import { DatabaseProviders } from 'src/providers/database.providers';

@Module({
  controllers: [UsersController],
  providers: [...DatabaseProviders, ...userProviders, UserService],
  exports: [UserService],
})
export class UsersModule {}
