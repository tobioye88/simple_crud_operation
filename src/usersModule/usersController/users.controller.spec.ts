import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user/user.service';
import { UsersController } from './users.controller';
import { User } from '../../../dist/usersModule/interfaces/User';

describe('UsersController', () => {
  let controller: UsersController;
  let spyService: UserService;
  const users = [
    {
      id: 1,
      firstName: 'Tobi',
      lastName: 'Oyelami',
      email: 'tobi@gmail.com',
      age: 20,
      phone: '08034006567',
    },
  ] as User[];

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        getUser: jest.fn(() => users[0]),
        getAllUsers: jest.fn(() => users),
        createUser: jest.fn((user: User) => users.push(user)),
        updateUser: jest.fn((id: number, user: User) => ({ id, ...user })),
        deleteUser: jest.fn((id: number) => true),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserServiceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    spyService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.getUser', async () => {
    await controller.getUser('1');
    expect(spyService.getUser).toHaveBeenCalled();
  });

  it('should call service.getAllUsers', async () => {
    await controller.getAllUsers();
    expect(spyService.getAllUsers).toHaveBeenCalled();
  });

  it('should call service.createUser', async () => {
    await controller.createUser(users[0]);
    expect(spyService.createUser).toHaveBeenCalled();
  });

  it('should call service.updateUser', async () => {
    await controller.updateUser('1', users[0]);
    expect(spyService.updateUser).toHaveBeenCalled();
  });

  it('should call service.deleteUser', async () => {
    await controller.deleteUser('1');
    expect(spyService.deleteUser).toHaveBeenCalled();
  });
});
