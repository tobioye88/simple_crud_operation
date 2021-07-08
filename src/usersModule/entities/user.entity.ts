import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces/User';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column()
  phone: string;
}
