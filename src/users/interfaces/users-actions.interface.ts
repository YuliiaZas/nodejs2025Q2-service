import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface UsersActions {
  addUser(user: CreateUserDto): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
