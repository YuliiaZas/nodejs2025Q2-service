import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersActions } from './users-actions.interface';

export interface IUsersService extends UsersActions {
  updateUserPassword(id: string, password: string): Promise<User | null>;
  isUserPasswordCorrect(id: string, password: string): Promise<boolean | null>;
  getUserAuthenticated(user: CreateUserDto): Promise<User | null>;
}
