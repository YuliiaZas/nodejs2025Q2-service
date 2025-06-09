import { User } from '../entities/user.entity';
import { IUsersDatabase } from './users-database.interface';

export interface IUsersService
  extends Omit<IUsersDatabase, 'updateUserFields'> {
  updateUserPassword(id: string, password: string): Promise<User | null>;
  isUserPasswordCorrect(id: string, password: string): Promise<boolean | null>;
}
