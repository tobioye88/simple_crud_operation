import { Module } from '@nestjs/common';
import { UsersModule } from './usersModule/users.module';

@Module({
  imports: [UsersModule],
  providers: [],
})
export class AppModule {}
