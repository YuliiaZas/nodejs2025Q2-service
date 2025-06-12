import { User } from '../entities/user.entity';
import { UsersActions } from './users-actions.interface';

export interface IUsersDatabase extends UsersActions {
  getUserByLogin(login: string): Promise<User | null>;
  updateUserFields(
    id: string,
    updatedFields: Partial<User>,
  ): Promise<User | null>;
}
