import { IUsersDatabase } from './users-database.interface';

export interface IUsersService extends IUsersDatabase {
  isUserPasswordCorrect(id: string, password: string): Promise<boolean | null>;
}
