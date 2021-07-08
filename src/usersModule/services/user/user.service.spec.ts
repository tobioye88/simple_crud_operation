import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../../../../dist/usersModule/interfaces/User';

describe('UserService', () => {
  let userService: UserService;

  let resultAll = [
    {
      id: 1,
      firstName: 'Tobi',
      lastName: 'Oyelami',
      email: 'tobi@gmail.com',
      age: 20,
      phone: '08034006567',
    },
    {
      id: 2,
      firstName: 'Tom',
      lastName: 'Sawyer',
      email: 'tomsayer@gmail.com',
      age: 33,
      phone: '08034000000',
    },
  ] as User[];

  const mockUserService = {
    getUser: () => resultAll[0],
    getAllUsers: () => resultAll,
    createUser: (user: User) => {
      user.id = resultAll.length;
      resultAll.push(user);
      return resultAll;
    },
    deleteUser: (id: number) => {
      resultAll = resultAll.filter((user) => user.id !== id);
    },
    updateUser: (user: User) => {
      resultAll = resultAll.map((mUser) => {
        if (mUser.id === user.id) {
          user.id = mUser.id;
          return user;
        } else {
          return mUser;
        }
      });
    },
  };

  const userServiceProvider = {
    provide: UserService,
    useValue: mockUserService,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userServiceProvider],
      exports: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return a user', async () => {
    const response = await userService.getUser(1);
    expect(response.lastName).toBe('Oyelami');
  });

  it('should return all user', async () => {
    const response = await userService.getAllUsers();
    expect(response.length).toBe(2);
  });

  it('should create a user', async () => {
    await userService.createUser({
      firstName: 'Taylor',
      lastName: 'Swift',
      email: 'taylorswift@gmail.com',
      age: 20,
      phone: '08034006567',
    });

    expect(resultAll.length).toBe(3);
  });

  it('should delete a user', async () => {
    await userService.deleteUser(1);
    expect(resultAll.length).toBe(2);
  });

  it('should update a user', async () => {
    await userService.updateUser(1, {
      firstName: 'Taylor',
      lastName: 'Swift',
      email: 'taylorswift@gmail.com',
      age: 20,
      phone: '08034006567',
    });
    expect(resultAll[1].firstName).toBe('Taylor');
  });
});
