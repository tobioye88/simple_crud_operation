import { User } from '../interfaces/User';

export class UserDTO implements User {
  id?: number;

  email: string;

  firstName?: string;

  lastName?: string;

  age?: number;

  phone: string;
}
